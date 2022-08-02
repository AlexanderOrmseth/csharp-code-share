using System.Text;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Models;
using API.Resources;
using CsharpToColouredHTML.Core;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CodeFragmentController : BaseController
{
    private readonly ICodeRepository _codeRepository;

    public CodeFragmentController(ICodeRepository codeRepository)
    {
        _codeRepository = codeRepository;
    }

    /// <summary>
    ///     Gets code-fragment by id
    /// </summary>
    /// <param name="id">Guid</param>
    /// <param name="theme">String</param>
    /// <returns>Returns a code-fragment-dto</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<CodeFragmentDto>> GetCodeFragmentById(
        [FromRoute] string id,
        [FromQuery] string? theme)
    {
        // validate guid
        if (!Guid.TryParse(id, out var validId))
            return BadRequest(new ProblemDetails {Title = "Error! Id is not valid!"});

        var codeFragment = await _codeRepository.GetCodeById(validId);

        // check if exists
        if (codeFragment is null) return NotFound();

        // generate html
        var html = GenerateHtml(codeFragment.Code, theme);
        var linesOfCode = html.Split(new[] {"<tr>"}, StringSplitOptions.None).Length - 1;

        return Ok(new CodeFragmentDto
        {
            Id = codeFragment.Id,
            Title = codeFragment.Title,
            Author = codeFragment.Author,
            Code = html,
            CodeString = codeFragment.Code,
            CreatedAt = codeFragment.CreatedAt,
            LinesOfCode = linesOfCode
        });
    }

    /// <summary>
    ///     Returns a preview with syntax highlight
    /// </summary>
    /// <param name="request">Code and theme</param>
    /// <returns>A preview with syntax highlight</returns>
    [HttpPost("preview")]
    public CodePreview GetPreview([FromBody] RequestPreview request)
    {
        var html = GenerateHtml(request.Code, request.Theme);
        var linesOfCode = html.Split(new[] {"<tr>"}, StringSplitOptions.None).Length - 1;
        return new CodePreview {Code = html, LinesOfCode = linesOfCode};
    }

    /// <summary>
    ///     Creates and adds code-fragment to db
    /// </summary>
    /// <param name="addCodeFragmentDto">code, author, title</param>
    /// <returns>Id of added code-fragment</returns>
    [HttpPost]
    public async Task<ActionResult<Guid>> AddCodeFragment([FromBody] AddCodeFragmentDto addCodeFragmentDto)
    {
        // new codeFragment
        var newCodeFragment = new CodeFragment
        {
            Title = addCodeFragmentDto.Title,
            Author = addCodeFragmentDto.Author,
            Code = addCodeFragmentDto.Code,
            CreatedAt = DateTime.UtcNow
        };

        // add codeFragment -> return Id of added fragment
        if (await _codeRepository.AddCodeAndSave(newCodeFragment))
            return CreatedAtAction(nameof(GetCodeFragmentById), new {id = newCodeFragment.Id},
                new {newCodeFragment.Id});

        return BadRequest(new ProblemDetails {Title = "Error! Could not add your code."});
    }

    /// <summary>
    ///     Generates html (string) with requested theme
    /// </summary>
    /// <param name="code">string</param>
    /// <param name="themeParam">string</param>
    /// <returns>html as a string</returns>
    private static string GenerateHtml(string code, string? themeParam = null)
    {
        // get theme
        IThemeValues theme = themeParam switch
        {
            "rider" => new Theme.Rider(),
            _ => new Theme.VisualStudio()
        };

        // custom styling
        var styleBuilder = new StringBuilder();
        styleBuilder.Append("<style>");
        styleBuilder.Append(
            ":root{color-scheme: dark;}*{padding:0;margin:0;box-sizing:border-box;}html{font-size:15px;}");
        styleBuilder.Append(
            $".background{{font-family:{theme.FontFamily};background-color:#1E1E1E;color:{theme.BaseColor};}}");
        styleBuilder.Append($".numeric{{color:{theme.NumericColor};}}");
        styleBuilder.Append($".method{{color:{theme.MethodColor};}}");
        styleBuilder.Append($".class{{color:{theme.ClassColor};}}");
        styleBuilder.Append($".keyword{{color:{theme.KeywordColor};}}");
        styleBuilder.Append($".string{{color:{theme.StringColor};}}");
        styleBuilder.Append($".interface{{color:{theme.InterfaceColor};}}");
        styleBuilder.Append($".enumName{{color:{theme.EnumNameColor};}}");
        styleBuilder.Append($".numericLiteral{{color:{theme.NumericLiteralColor};}}");
        styleBuilder.Append($".recordStruct{{color:{theme.RecordStructColor};}}");
        styleBuilder.Append($".typeParam{{color:{theme.TypeParamColor};}}");
        styleBuilder.Append($".extension{{color:{theme.ExtensionColor};}}");
        styleBuilder.Append($".control{{color:{theme.ControlColor};}}");
        styleBuilder.Append($".internalError{{color:{theme.InternalErrorColor};}}");
        styleBuilder.Append($".comment{{color:{theme.CommentColor};font-style:{theme.CommentStyle};}}");
        styleBuilder.Append($".preprocessor{{color:{theme.PreprocessorColor};}}");
        styleBuilder.Append($".preprocessorText{{color:{theme.PreprocessorTextColor};}}");
        styleBuilder.Append($".struct{{color:{theme.StructColor};}}");
        styleBuilder.Append($".namespace{{color:{theme.NamespaceColor};}}");
        styleBuilder.Append($".enumMember{{color:{theme.EnumMemberColor};}}");
        styleBuilder.Append($".identifier{{color:{theme.IdentifierColor};}}");
        styleBuilder.Append($".punctuation{{color:{theme.PunctuationColor};}}");
        styleBuilder.Append($".operator{{color:{theme.OperatorColor};}}");
        styleBuilder.Append($".propertyName{{color:{theme.PropertyNameColor};}}");
        styleBuilder.Append($".fieldName{{color:{theme.FieldNameColor};}}");
        styleBuilder.Append($".labelName{{color:{theme.LabelNameColor};}}");
        styleBuilder.Append($".operator_overloaded{{color:{theme.OperatorOverloadedColor};}}");
        styleBuilder.Append($".constant{{color:{theme.ConstantColor};}}");
        styleBuilder.Append($".localName{{color:{theme.LocalNameColor};}}");
        styleBuilder.Append($".parameter{{color:{theme.ParameterColor};}}");
        
        styleBuilder.Append($".delegate{{color:{theme.Delegate};}}");
        styleBuilder.Append($".eventName{{color:{theme.EventName};}}");
        styleBuilder.Append($".excludedCode{{color:{theme.ExcludedCode};}}");
        
        styleBuilder.Append("table{white-space:pre;border-spacing:0;width:100%;}");
        styleBuilder.Append(
            ".line_no::before{content:attr(line_no);color:#565656;}.line_no{min-width:40px;border-right:1px solid #222;}");
        styleBuilder.Append($".code_column{{padding-left:4px;color:{theme.BaseColor};}}");
        styleBuilder.Append(
            "tr{line-height:24px;height:24px;border-radius:3px;display:flex;flex-direction:row;}");
        styleBuilder.Append(
            "@media(hover: hover) and (pointer: fine) {tr:hover{background-color:#252627;}tr:hover>.line_no::before{color:#929292;}}");
        styleBuilder.Append("</style>");

        // use css and generate html
        var settings = new HTMLEmitterSettings().UseCustomCSS(styleBuilder.ToString()).DisableIframe();
        var html = new CsharpColourer().ProcessSourceCode(code, new HTMLEmitter(settings));
        return html;
    }
}