using System.Text;
using API.Interfaces;
using API.Models;
using API.Resources;
using CsharpToColouredHTML.Core;

namespace API.Helpers;

public class HtmlGenerator
{
    public HtmlGenerator(string code, string? theme = null)
    {
        var html = GenerateHtml(code, theme);

        Html = html.Html;
        LinesOfCode = html.LinesOfCode;
    }

    public string Html { get; set; }
    public int LinesOfCode { get; set; }


    /// <summary>
    ///     Generates html (string) with requested theme
    /// </summary>
    /// <param name="code">string</param>
    /// <param name="themeParam">string</param>
    /// <returns>html as a string</returns>
    private static GeneratedHtml GenerateHtml(string code, string? themeParam = null)
    {
        // set theme
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

        var settings = new HTMLEmitterSettings().UseCustomCSS(styleBuilder.ToString()).DisableIframe();
        var html = new CsharpColourer().ProcessSourceCode(code, new HTMLEmitter(settings));
        var linesOfCode = html.Split(new[] {"<tr>"}, StringSplitOptions.None).Length - 1;
        return new GeneratedHtml {Html = html, LinesOfCode = linesOfCode};
    }
}