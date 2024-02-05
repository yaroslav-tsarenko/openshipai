import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { useState } from 'react';

const VoiceMessage = () => {
    const recorderControls = useAudioRecorder();
    const [audioUrl, setAudioUrl] = useState('');

    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
    };

    return (
        <div>
            <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                recorderControls={recorderControls}
            />
            {audioUrl && <audio src={audioUrl} controls />}
        </div>
    )
}

export default VoiceMessage;