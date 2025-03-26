using System.Text.Json.Serialization;

namespace SnowMemoria.Models
{
    public class Manga
    {
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("chapter")]
        public string Chapter { get; set; } = string.Empty;

        [JsonPropertyName("pages")]
        public List<MangaPage> Pages { get; set; } = [];
    }
}
