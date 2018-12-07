<?php

namespace App\Http\Controllers\API;

use App\User;
use GuzzleHttp\Client;
use Laravel\Passport\Client as PassportClient;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterUserRequest;
use GuzzleHttp\Exception\BadResponseException;

class AuthController extends Controller
{

    public function getLoggedUser()
    {
        if(Auth::check()) {
            return response()->json(['user' => Auth::user()]);
        } else {
            return response()->json(null, 401);
        }
    }
    public function login(Request $request)
    {
        return $this->createUserToken($request->username, $request->password);
    }

    public function register(RegisterUserRequest $request)
    {

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return $this->createUserToken($request->username, $request->password);

    }

    public function logout()
    {

        auth()->user()->tokens->each(function ($token) {
            $token->delete();
        });

        return response()->json('Logged out successfully');
    }

    protected function createUserToken($username, $password)
    {
        $http = new Client;

        $client = PassportClient::wherePasswordClient(true)->firstOrFail();

        try {
            $response = $http->post(url('/oauth/token'), [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => $client->id,
                    'client_secret' => $client->secret,
                    'username' => $username,
                    'password' => $password,
                ],
            ]);

            return $response->getBody();

        } catch (BadResponseException $e) {
            if ($e->getCode() === 400) {
                return response()->json("Invalid Request. Please enter a username and password", $e->getCode());
            } else if ($e->getCode() === 401) {
                return response()->json("Your credentials are incorrect. Please try again", $e->getCode());
            }
            return response()->json("Something went wrong on the server", $e->getCode());
        }

    }
}
