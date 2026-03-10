export type VoiceRecorderProps = {
  isRecording: boolean;
  elapsedSeconds: number;
  onStart: () => void;
  onStop: () => void;
};
