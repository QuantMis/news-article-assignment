<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::latest()->paginate(5);
        return response()->json($news);
    }

    public function show($id) {
        $news = News::findOrFail($id);
        return response()->json($news);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'article_date' => 'required|date',
            'publisher' => 'required|string|max:255',
        ]);

        $news = News::create($validated);

        return response()->json(['message' => 'News article created successfully', 'data' => $news], 201);
    }

    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'summary' => 'sometimes|string',
            'article_date' => 'sometimes|date',
            'publisher' => 'sometimes|string|max:255',
        ]);

        $news->update($validated);

        return response()->json(['message' => 'News article updated successfully', 'data' => $news]);
    }

    public function destroy($id) {
        $news = News::findOrFail($id)->delete();
        return response()->json(['message' => 'News article deleted successfully']);
    }
}
