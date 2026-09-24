// Modular Audio & Speech Recognition Service
// Supports live microphone streaming, AudioContext waveform visualizer, MediaRecorder capture, and STT

class SpeechService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.audioStream = null;
    this.audioContext = null;
    this.analyser = null;
    this.recognition = null;
    this.isRecording = false;
  }

  // Check if browser supports Web Speech API
  isSpeechRecognitionSupported() {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  // Start Voice Capture with live audio visualizer stream
  async startRecording({ onDataAvailable, onVisualizerData, onTranscript, language = 'en-IN' }) {
    try {
      this.audioChunks = [];
      this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Setup Web Audio API Analyser for Live Waveform
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
        const source = this.audioContext.createMediaStreamSource(this.audioStream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        source.connect(this.analyser);

        if (onVisualizerData) {
          const bufferLength = this.analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          const updateVisualizer = () => {
            if (this.isRecording && this.analyser) {
              this.analyser.getByteFrequencyData(dataArray);
              onVisualizerData(dataArray);
              requestAnimationFrame(updateVisualizer);
            }
          };
          updateVisualizer();
        }
      }

      // MediaRecorder for playback and simulated acoustic feature extraction
      this.mediaRecorder = new MediaRecorder(this.audioStream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        if (onDataAvailable) {
          onDataAvailable({ audioBlob, audioUrl });
        }
      };

      this.mediaRecorder.start(100);
      this.isRecording = true;

      // Real Speech-To-Text if supported
      if (this.isSpeechRecognitionSupported()) {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRec();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        // Map locale to speech language
        const langMap = {
          en: 'en-IN',
          ta: 'ta-IN',
          hi: 'hi-IN',
          te: 'te-IN',
          kn: 'kn-IN',
          ml: 'ml-IN'
        };
        this.recognition.lang = langMap[language] || 'en-IN';

        this.recognition.onresult = (event) => {
          let transcript = '';
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + ' ';
          }
          if (onTranscript) {
            onTranscript(transcript.trim());
          }
        };

        this.recognition.onerror = (err) => {
          console.warn('Speech recognition warning/fallback:', err);
        };

        try {
          this.recognition.start();
        } catch (e) {
          console.warn('Speech recognition already active or unavailable:', e);
        }
      }

      return { success: true };
    } catch (err) {
      console.warn('Microphone access denied or simulated fallback active:', err);
      // Fallback: simulated recording mode
      this.isRecording = true;
      return { success: false, error: err.message, simulated: true };
    }
  }

  // Stop Recording
  stopRecording() {
    this.isRecording = false;

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }

    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = null;
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch (e) {
        // ignore
      }
    }

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.recognition = null;
    }
  }
}

export const speechService = new SpeechService();
