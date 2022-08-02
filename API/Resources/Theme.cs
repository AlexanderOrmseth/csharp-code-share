using API.Interfaces;

namespace API.Resources;

public static class Theme
{
    public class VisualStudio : IThemeValues
    {
        public string FontFamily { get; } = "Cascade Mono,monaco,Consolas,LucidaConsole,monospace";
        public string CommentStyle { get; } = "normal";
        public string BaseColor { get; } = "#dfdfdf";
        public string NumericColor { get; } = "#b5cea8";
        public string MethodColor { get; } = "#dcdcaa";
        public string ClassColor { get; } = "#4ec9b0";
        public string KeywordColor { get; } = "#569cd6";
        public string StringColor { get; } = "#ce9178";
        public string InterfaceColor { get; } = "#b8d7a3"; // same ->
        public string EnumNameColor { get; } = "#b8d7a3";
        public string NumericLiteralColor { get; } = "#b8d7a3";
        public string RecordStructColor { get; } = "#b8d7a3";
        public string TypeParamColor { get; } = "#b8d7a3";
        public string ExtensionColor { get; } = "#b8d7a3"; // -> til here
        public string ControlColor { get; } = "#c586c0";
        public string InternalErrorColor { get; } = "#ff0d0d";
        public string CommentColor { get; } = "#6a9955";
        public string PreprocessorColor { get; } = "#808080";
        public string PreprocessorTextColor { get; } = "#a4a4a4";
        public string StructColor { get; } = "#86c691";
        
        public string NamespaceColor { get; } = "#dfdfdf"; // base ->
        public string EnumMemberColor { get; } = "#dfdfdf";
        public string IdentifierColor { get; } = "#dfdfdf";
        public string PunctuationColor { get; } = "#dfdfdf";
        public string OperatorColor { get; } = "#dfdfdf";
        public string PropertyNameColor { get; } = "#dfdfdf";
        public string FieldNameColor { get; } = "#dfdfdf";
        public string LabelNameColor { get; } = "#dfdfdf";
        public string OperatorOverloadedColor { get; } = "#dfdfdf";
        public string ConstantColor { get; } = "#dfdfdf"; // til here <-
        
        public string LocalNameColor { get; } = "#9cdcfe";
        public string ParameterColor { get; } = "#9cdcfe";
        public string Delegate { get; } = "#4ec9b0";
        public string EventName { get; } = "#dfdfdf";
        public string ExcludedCode { get; } = "#808080";
    }

    public class Rider : IThemeValues
    {
        public string FontFamily { get; private set; } = "JetBrains Mono,monaco,Consolas,LucidaConsole,monospace";
        public string CommentStyle { get; } = "italic";
        public string BaseColor { get; private set; } = "#bdbdbd";
        public string NumericColor { get; } = "#bdbdbd"; // not set
        public string MethodColor { get; } = "#39cc8f";
        public string ClassColor { get; } = "#c191ff";
        public string KeywordColor { get; } = "#6c95eb";
        public string StringColor { get; } = "#c9a26d";
        public string InterfaceColor { get; } = "#c191ff";
        public string EnumNameColor { get; } = "#e1bfff";
        public string NumericLiteralColor { get; } = "#ed94c0";
        public string RecordStructColor { get; } = "#e1bfff";
        public string TypeParamColor { get; } = "#c191ff";
        public string ExtensionColor { get; } = "#39cc8f"; // from extensionMethodColor rider
        public string ControlColor { get; } = "#6c95eb"; // same as keyword
        public string InternalErrorColor { get; private set; } = "#fa5546"; // bugged in v18
        public string CommentColor { get; private set; } = "#85c46c";
        public string PreprocessorColor { get; } = "#787878";
        public string PreprocessorTextColor { get; } = "#bdbdbd"; // not set
        public string StructColor { get; } = "#dab9f7";
        public string NamespaceColor { get; } = "#c191ff";
        public string EnumMemberColor { get; } = "#bdbdbd"; // not set
        public string IdentifierColor { get; } = "#bdbdbd"; // not set
        public string PunctuationColor { get; } = "#bdbdbd"; // not set
        public string OperatorColor { get; } = "#bdbdbd"; // not set
        public string PropertyNameColor { get; } = "#5db2ba";
        public string FieldNameColor { get; } = "#bdbdbd"; // not set
        public string LabelNameColor { get; } = "#bdbdbd"; // not set
        public string OperatorOverloadedColor { get; } = "#bdbdbd"; // not set
        public string ConstantColor { get; } = "#bdbdbd"; // not set
        public string LocalNameColor { get; } = "#bdbdbd";
        public string ParameterColor { get; }  = "#bdbdbd";

        public string Delegate { get; } = "#E1BFFF";
        public string EventName { get; } = "#ED94C0";
        public string ExcludedCode { get; } = "#787878";
    }
}