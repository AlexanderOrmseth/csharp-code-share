using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class RequestPreview
{
    [Required][MaxLength(9000)][MinLength(10)] public string Code { get; set; }
    public string? Theme { get; set; }
}