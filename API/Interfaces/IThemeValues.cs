namespace API.Interfaces;

public interface IThemeValues
{
    public string FontFamily { get; }
    public string CommentStyle { get; }
    public string BaseColor { get; }
    public string NumericColor { get; }
    public string MethodColor { get; }
    public string ClassColor { get; }
    public string KeywordColor { get; }
    public string StringColor { get; }
    public string InterfaceColor { get; }
    public string EnumNameColor { get; }
    public string NumericLiteralColor { get; }
    public string RecordStructColor { get; }
    public string TypeParamColor { get; }
    public string ExtensionColor { get; }
    public string ControlColor { get; }
    public string InternalErrorColor { get; }
    public string CommentColor { get; }
    public string PreprocessorColor { get; }
    public string PreprocessorTextColor { get; }
    public string StructColor { get; }
    public string NamespaceColor { get; }
    public string EnumMemberColor { get; }
    public string IdentifierColor { get; }
    public string PunctuationColor { get; }
    public string OperatorColor { get; }
    public string PropertyNameColor { get; }
    public string FieldNameColor { get; }
    public string LabelNameColor { get; }
    public string OperatorOverloadedColor { get; }
    public string ConstantColor { get; }
    public string LocalNameColor { get; }
    public string ParameterColor { get; }
    
    public string Delegate { get; }
    public string EventName { get; }
    public string ExcludedCode { get; }
}