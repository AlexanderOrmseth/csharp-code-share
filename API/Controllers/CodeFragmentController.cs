using API.DTOs;
using API.Features.CodeFragment.Requests.Commands;
using API.Features.CodeFragment.Requests.Queries;
using API.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CodeFragmentController : BaseController
{
    private readonly IMediator _mediator;

    public CodeFragmentController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    ///     Gets code-fragment by id
    /// </summary>
    /// <param name="id">string</param>
    /// <param name="theme">string</param>
    /// <returns>Returns a code fragment</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<CodeFragmentDto>> GetCodeFragmentById(
        [FromRoute] string id,
        [FromQuery] string? theme)
    {
        var response = await _mediator.Send(new GetCodeFragmentByIdRequest(id, theme));

        // success
        if (!response.IsError) return Ok(response.Data);

        // error
        return response.Result switch
        {
            ResponseResult.NotFound => NotFound(response.Error),
            ResponseResult.BadRequest => BadRequest(response.Error),
            _ => BadRequest()
        };
    }

    /// <summary>
    ///     Returns a preview with syntax highlight
    /// </summary>
    /// <param name="request">Code and theme</param>
    /// <returns>A preview with syntax highlight</returns>
    [HttpPost("preview")]
    public async Task<ActionResult<GeneratedHtml>> GetPreview([FromBody] CodePreviewRequest request)
    {
        var response = await _mediator.Send(new GetCodeFragmentPreviewCommand(request));

        // success
        if (!response.IsError) return Ok(response.Data);

        // error
        return response.Result switch
        {
            ResponseResult.ValidationError => BadRequest(response.Error),
            ResponseResult.BadRequest => BadRequest(response.Error),
            _ => BadRequest()
        };
    }

    /// <summary>
    ///     Creates and adds code-fragment to db
    /// </summary>
    /// <param name="addCodeFragmentDto">code, author, title</param>
    /// <returns>Id of added code-fragment</returns>
    [HttpPost]
    public async Task<ActionResult<Guid>> AddCodeFragment([FromBody] AddCodeFragmentDto addCodeFragmentDto)
    {
        var response = await _mediator.Send(new AddCodeFragmentCommand(addCodeFragmentDto));

        // success
        if (!response.IsError) return Ok(response.Data);

        // error
        return response.Result switch
        {
            ResponseResult.ValidationError => BadRequest(response.Error),
            ResponseResult.BadRequest => BadRequest(response.Error),
            _ => BadRequest()
        };
    }
}