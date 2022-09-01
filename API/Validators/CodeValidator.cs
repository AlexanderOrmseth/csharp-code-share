using FluentValidation;

namespace API.Validators;

public class CodeValidator : AbstractValidator<string>
{
    public CodeValidator()
    {
        RuleFor(x => x).NotNull().NotEmpty().MinimumLength(10).MaximumLength(9000).WithName("Code")
            .OverridePropertyName("");
    }
}