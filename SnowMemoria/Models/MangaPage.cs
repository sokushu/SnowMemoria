using System.Text.Json.Serialization;

namespace SnowMemoria.Models
{

    public class MangaPage
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; } = string.Empty;

        [JsonPropertyName("isSpread")]
        public bool IsSpread { get;set; } = false;
    }
}
