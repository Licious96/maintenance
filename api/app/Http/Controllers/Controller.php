<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use App\Models\User;
use App\Models\Student;
use App\Mail\ForgotPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function register(Request $request){

        $student = Student::where('student_no', $request->student_no)->first();

        $fields = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|regex:/(^([a-zA-Z]+))/u',
                'student_no' => 'required|unique:users,student_no|digits:9',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|confirmed|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/'
            ]);

        if ($fields->fails()) {
                return response()->json($fields->errors(), 400);
        }

        if (!$student) {
            return response()->json('Your student number is not registered', 401);
        }

        $user = User::create([
            'name' => $request['name'],
            'student_no' => $request['student_no'],
            'email' => $request['email'],
            'password' => $request['password']
        ]);

        return response()->json($user, 201);
    }

    public function login(Request $request){

        $fields = Validator::make(
            $request->all(),
            [
                'student_no' => 'required',
                'password' => 'required'
            ]);

        if ($fields->fails()) {
                return response()->json($fields->errors(), 400);
        }
        $user = User::where('student_no', $request['student_no'])->first();

        //Check password
        if (!$user ) {
            return response()->json(['msg'=>'Wrong credentials, please check your password and student number'], 401);
        }

        return response()->json($user, 200);
    }

    public function getUser($id){
        return response()->json(User::find($id), 200);
    }

    public function forgotPassword($email){
        $user = User::where('email', $email)->orWhere('student_no', $email)->first();
        if ($user) {

            $email = $user->email;
            
            $data = array('name'=>$user->name, 'password'=>$user->password);
            Mail::send(['text'=>'mail'], $data, function($message) use ($email) {
                $message->to($email, 'Maintenance App')->subject
                   ('Password Recovery From Maintenace');
                $message->from('maintenance@ul.ac.za','no-reply');
             });
            return response()->json(['msg'=>'Your password has been send to your email, please check your mails']);
        }

        return response()->json(['msg'=>'We did not find you on our database, please make sure you are registered']);
    }
}
