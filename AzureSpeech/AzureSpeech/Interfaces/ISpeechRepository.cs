using Microsoft.CognitiveServices.Speech.Audio;

namespace AzureSpeech.Interfaces
{
    public interface ISpeechRepository
    {
        Task<byte[]> TextToSpeechAsync(string text);
        Task<string> SpeakToTextAsync(byte[] audioData, AudioConfig audioConfig);
    }
}
