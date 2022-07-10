using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class AddCodeFragmentDto
{
    [Required][MaxLength(9000)][MinLength(10)] public string Code { get; set; }
    
    [MaxLength(32)] public string? Title { get; set; }

    [MaxLength(32)] public string? Author { get; set; }
}