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
        private readonly SpeechToTextService _speechToTextService;
        private readonly TextToSpeechService _textToSpeechService;

        public SpeechController(SpeechToTextService speechToTextService, TextToSpeechService textToSpeechService)
        {
            _speechToTextService = speechToTextService;
            _textToSpeechService = textToSpeechService;

        }

        [HttpPost]
        public async Task<IActionResult> ConvertSpeechToTextAsync(IFormFile file)
        {
            if (file == null)
                return BadRequest("Arquivo vazio ou não recebido.");

            var _speechConfig = SpeechConfig.FromSubscription("4885e63be3fd4c25ac3a1e85c193169f", "brazilsouth");

            using var stream = file.OpenReadStream();

            var reader = new BinaryReader(stream);
            using var audioConfigStream = AudioInputStream.CreatePushStream();
            using var audioConfig = AudioConfig.FromStreamInput(audioConfigStream);

            var recognizer = new SpeechRecognizer(_speechConfig, "pt-BR", audioConfig);

            byte[] readBytes;
            do
            {
                readBytes = reader.ReadBytes(1024);
                audioConfigStream.Write(readBytes, readBytes.Length);
            } while (readBytes.Length > 0);

            var text = await recognizer.RecognizeOnceAsync();
            return Ok(text.Text);
        }

        [HttpPost("textToSpeech")]
        public async Task<IActionResult> ConvertTextToSpeechAsync([FromBody] string text)
        {
            var audioData = await _textToSpeechService.ConvertTextToSpeechAsync(text);
            return File(audioData, "audio/wav");
        }

    }
}
