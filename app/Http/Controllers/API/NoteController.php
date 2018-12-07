<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\NoteStoreRequest;
use App\Http\Requests\NoteUpdateRequest;
use App\Http\Resources\NoteCollection;
use App\Http\Resources\NoteResource;
use App\Note;
use App\User;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use App\Classes\TextEditor;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $notes = auth()->user()->notes()->latest()->paginate(2);

        return new NoteCollection($notes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NoteStoreRequest $request)
    {

        $note = new Note;

        $note->title = $request->title;

        $note->description = TextEditor::create($request->description, 'notes');

        $note->slug = str_slug($request->title);

        $note = auth()->user()->notes()->save($note);

        return new NoteResource($note);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function show(Note $note)
    {
        return new NoteResource($note);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function update(NoteUpdateRequest $request, Note $note)
    {
        $note->title = $request->title;

        $note->description = TextEditor::create($request->description, 'notes');

        $note->save();

        return new NoteResource($note);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function destroy(Note $note)
    {
        $note->delete();

        return response()->json([], 200);
    }
}
