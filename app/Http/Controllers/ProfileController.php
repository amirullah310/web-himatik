<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show(string $username)
    {
        $user = User::where('username', $username)->firstOrFail();

        return Inertia::render('Profile/PublicProfile', [
            'user' => $user,
        ]);
    }
}
