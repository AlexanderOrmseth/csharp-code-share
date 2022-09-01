using FluentValidation.Results;

namespace API.Models;

/// <summary>
///     Response results from a request.
/// </summary>
public enum ResponseResult
{
    NotFound,
    ValidationError,
    BadRequest
}

public class Response<T>
{
    public bool IsError { get; private set; }
    public ResponseResult Result { get; private set; }
    public T? Data { get; set; }
    public ResponseError? Error { get; set; }

    /// <summary>
    ///     Add 'Validation' error
    /// </summary>
    /// <param name="validationResult">FluentValidation</param>
    public void AddValidationErrors(ValidationResult validationResult)
    {
        IsError = true;
        Result = ResponseResult.ValidationError;
        Error = new ResponseError(validationResult);
    }

    /// <summary>
    ///     Add 'NotFound' error
    /// </summary>
    /// <param name="errorMessage"></param>
    public void AddNotFoundError(string errorMessage = "Not Found")
    {
        IsError = true;
        Result = ResponseResult.NotFound;
        Error = new ResponseError(errorMessage);
    }

    /// <summary>
    ///     Add 'BadRequest' error
    /// </summary>
    /// <param name="errorMessage"></param>
    public void AddError(string errorMessage)
    {
        IsError = true;
        Result = ResponseResult.BadRequest;
        Error = new ResponseError(errorMessage);
    }
}