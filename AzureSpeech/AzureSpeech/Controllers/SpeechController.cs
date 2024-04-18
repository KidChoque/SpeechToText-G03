using AzureSpeech.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CognitiveServices.Speech.Audio;
using Microsoft.CognitiveServices.Speech;

namespace AzureSpeech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpeechController : ControllerBase
    {

        static string speechKey = "2d627ab8ba4649ab8e14fa94c85cc7aa";
        static string speechRegion = "eastus";

        [HttpPost("SpeechToText")]
        public async Task<IActionResult> Post(IFormFile audio)
        {
            var speechConfig = SpeechConfig.FromSubscription(speechKey, speechRegion);
            speechConfig.SpeechRecognitionLanguage = "pt-BR";

            var file = Path.GetTempFileName();
            using (var stream = new FileStream(file, FileMode.Create))
            {
                await audio.CopyToAsync(stream);
            }

            using var audioConfig = AudioConfig.FromWavFileInput(file);
            using var speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);

            var speechRecognitionResult = await speechRecognizer.RecognizeOnceAsync();
            var audioResult = OutputSpeechRecognitionResult(speechRecognitionResult);

            return Ok(audioResult);

        }


        [HttpPost("TextToSpeech")]
        public async Task<IActionResult> Post([FromForm] string text)
        {
            var speechConfig = SpeechConfig.FromSubscription(speechKey, speechRegion);

            speechConfig.SpeechSynthesisVoiceName = "en-US-AvaMultilingualNeural";

            using (var speechSynthesizer = new SpeechSynthesizer(speechConfig))
            {

                var speechSynthesisResult = await speechSynthesizer.SpeakTextAsync(text);

                if (speechSynthesisResult.Reason == ResultReason.SynthesizingAudioCompleted)
                {
                    return File(speechSynthesisResult.AudioData, "audio/mpeg", "output.mp3");
                }
                else
                {

                    return BadRequest("Deu ruim");
                }
            }

        }

        static string OutputSpeechRecognitionResult(SpeechRecognitionResult speechRecognitionResult)
        {
            if (speechRecognitionResult.Reason == ResultReason.RecognizedSpeech)
            {
                return ($"{speechRecognitionResult.Text}");
            }

            else if (speechRecognitionResult.Reason == ResultReason.Canceled)
            {
                var cancellation = CancellationDetails.FromResult(speechRecognitionResult);
                return ($"CANCELED: Reason={cancellation.Reason}");

            }
            else if (speechRecognitionResult.Reason == ResultReason.Canceled)
            {
                var cancellation = CancellationDetails.FromResult(speechRecognitionResult);
                return ($"CANCELED: Reason={cancellation.Reason}");
            }

            else
            {
                return "Deu ruim";
            }
        }

    }


}