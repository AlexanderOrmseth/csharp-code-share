using FluentValidation.Results;

namespace API.Models;

/// <summary>
///     Validation Error with
/// </summary>
public class ResponseError
{
    public ResponseError(string title)
    {
        Title = title;
    }

    public ResponseError(ValidationResult validationResult)
    {
        Errors = new Dictionary<string, string>();
        foreach (var error in validationResult.Errors.Where(error => !Errors.ContainsKey(error.PropertyName)))
            Errors.Add(error.PropertyName, error.ErrorMessage);
        Title = $"{Errors.Count} Validation error(s) occured";
    }

    public Dictionary<string, string>? Errors { get; }
    public string? Title { get; }
}