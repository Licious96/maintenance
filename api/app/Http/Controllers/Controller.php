<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use App\Models\User;
use App\Models\Student;
use App\Models\Query;
use App\Models\Staff;
use App\Models\Record;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function register(Request $request){

        $student = Student::where('student_no', $request->student_no)->first();

        $fields = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|regex:/^[a-z ,.\'-]+$/i',
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

        $email = $request->email;
        $name = $request->name;
        $otp = mt_rand(0000, 9999);
        $data = array('name'=>$name, 'otp'=>$otp);
        Mail::send(['text'=>'otp'], $data, function($message) use ($email, $name) {
            $message->to($email, $name)->subject('OTP Verification');
            $message->from('maintenance@ul.ac.za','no-reply');
        });

        return response()->json($otp, 200);
        
    }

    public function otp (Request $request) {
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
        if (!$user || ($user->password !== $request->password) ) {
            return response()->json(['msg'=>'Wrong credentials, please check your password and student number'], 401);
        }

        return response()->json($user, 200);
    }

    public function staffLogin(Request $request){

        $fields = Validator::make(
            $request->all(),
            [
                'staff_no' => 'required',
                'password' => 'required'
            ]);

        if ($fields->fails()) {
                return response()->json($fields->errors(), 400);
        }
        
        $user = Staff::where('staff_no', $request['staff_no'])->first();

        //Check password
        if (!$user || ($user->password !== $request->password) ) {
            return response()->json(['msg'=>'Wrong credentials, please check your password and staff number'], 401);
        }

        return response()->json($user, 200);
    }

    public function getUser($id){
        return response()->json(User::find($id), 200);
    }

    public function getAdmin($id){
        return response()->json(Staff::find($id), 200);
    }

    public function forgotPassword($email){
        $user = User::where('email', $email)->orWhere('student_no', $email)->first();
        
        if ($user) {

            $email = $user->email;
            $name = $user->name;
            
            $data = array('name'=>$user->name, 'password'=>$user->password);
            Mail::send(['text'=>'mail'], $data, function($message) use ($email, $name) {
                $message->to($email, $name)->subject('Password Recovery From Maintenace');
                $message->from('maintenance@ul.ac.za','no-reply');
            });
            return response()->json(['sent'=>'Your password has been send to your email, please check your mails']);
        }

        return response()->json(['msg'=>'We did not find you on our database, please enter the correct email or student number']);
    }

    public function query(Request $request){
        $fields = Validator::make(
            $request->all(),
            [
                'user_id' => 'required',
                'residence' => 'required|regex:/^[a-z ,.\'-]+$/i',
                'room' => 'required|digits:4',
                'problem' => 'required|regex:/^[a-z ,.\'-]+$/i',
                'time' => 'required',
                'contacts' => 'required|digits:10'
            ]);

        if ($fields->fails()) {
                return response()->json($fields->errors(), 400);
        }

        $query = Query::create([
            'user_id' => $request->user_id,
            'residence' => $request->residence,
            'room' => $request->room,
            'problem' => $request->problem,
            'time' => $request->time,
            'contacts' => $request->contacts,
            'deleted' => 0
        ]);

        return response()->json($query, 201);
    }

    public function getQueries($id) {
        $queries = Query::orderBy('id', 'DESC')->where('user_id', $id)->where('deleted', 0)->get();
        return response()->json($queries, 200);
    }

    public function getAllQueries() {
        $queries = Query::orderBy('id', 'DESC')->get();
        return response()->json($queries, 200);
    }

    public function updateStatus($id, $status){
        $query = Query::find($id);
        if ($query) {
            $query->status = $status;
            $query->save();
            return response()->json(200);
        }
    }

    public function remove($id) {

        $query = Query::find($id);
        if ($query->status !== "Pending") {
            $query->deleted = 1;
            $query->save();
            return response()->json(201);
        }

        return response()->json(Query::find($id)->delete());
    }

    public function updatePassword(Request $request, $id){

        $fields = Validator::make(['password' => $request->password], [
            'password' => 'required'
        ]);

        if ($fields->fails()) {
                return response()->json($fields->errors(), 400);
        }
        
        $query = User::find($id);
        if ($query) {
            $query->password = $request->password;
            $query->save();
            return response()->json(200);
        }
    }

    public function updateEmail(Request $request, $id){

        $fields = Validator::make(['email' => $request->email], [
            'email' => 'required|email|unique:users,email',
        ]);

        if ($fields->fails()) {
                return response()->json($fields->errors(), 400);
        }
        
        $query = User::find($id);
        if ($query) {
            $query->email = $request->email;
            $query->save();
            return response()->json(200);
        }
    }

    public function uploadPicture(Request $request) {

        $file = $request->file('image');
        $newName = round(microtime(true)*1000) . '.' . $file->getClientOriginalExtension();
        $path = base_path('public/assets/images');
        $file->move($path, $newName);
        $query = User::find($request->id);
        $query->image = $newName;
        $query->save();
        return response()->json($newName, 200);
    }

    public function recordQuery (Request $request) {

        $fields = Validator::make(
            $request->all(),
            [
                'problem' => 'required|regex:/^[a-z ,.\'-]+$/i',
                'residence' => 'required|regex:/^[a-z, 0-9 ,.\'-]+$/i',
                'room' => 'required|digits:4',
                'problem_type' => 'required',
                'cost' => 'required|numeric|between:0,9999999999.99',
                'assigned_to' => 'required'
            ]
        );

        if ($fields->fails()) {
            return response()->json($fields->errors(), 400);
        }

        $query = Record::create([
            'problem' => $request->problem,
            'residence' => $request->residence,
            'room' => $request->room,
            'problem_type' => $request->problem_type,
            'cost' => $request->cost,
            'assigned_to' => $request->assigned_to
        ]);

        return response()->json($query, 201);
    }

    public function getRecords() {
        return response()->json(Record::get(), 200);
    }

    public function getSum () {
        return response()->json(Record::sum('cost'), 200);
    }
}
