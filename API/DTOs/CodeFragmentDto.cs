namespace API.DTOs;

public class CodeFragmentDto
{
    public string Code { get; set; }

    public Guid Id { get; set; }

    public string? Title { get; set; }

    public string? Author { get; set; }

    public string CodeString { get; set; }

    public DateTime CreatedAt { get; set; }

    public int LinesOfCode { get; set; }
}