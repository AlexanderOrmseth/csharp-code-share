using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

public class CodeFragment
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public Guid Id { get; set; }

    [MaxLength(32)] public string? Title { get; set; }

    [MaxLength(32)] public string? Author { get; set; }

    [MaxLength(9000)] [MinLength(10)] public string Code { get; set; }

    public DateTime CreatedAt { get; set; }
}