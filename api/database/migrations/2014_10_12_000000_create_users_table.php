<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('student_no')->unique();
            $table->string('email')->unique();
            $table->string('image')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        DB::table('users')->insert(
            [     
                [
                    'name' => 'MALEPE MR',
                    'student_no' => 202017199,
                    'email' => '202017199@keyaka.ul.ac.za',
                    'password' => 'Malepe@17199'
                ],     
                [ 
                    'name' => 'PHALA MP',
                    'student_no' => 201910340,
                    'email' => '201910340@keyaka.ul.ac.za',
                    'password' => 'Phala@10340'
                ],
                [
                    'name' => 'REMBULUWANI MP',
                    'student_no' => 201922174,
                    'email' => '201922174@keyaka.ul.ac.za',
                    'password' => 'Rembuluwani@22174'
                ],
                [
                    'name' => 'TEKA MP',
                    'student_no' => 201907684,
                    'email' => '201907684@keyaka.ul.ac.za',
                    'password' => 'Teka@07684'
                ],
                [
                    'name' => 'MOREROA MR',
                    'student_no' => 202045673,
                    'email' => '202045673@keyaka.ul.ac.za',
                    'password' => 'Moreroa@45673'
                ],
                [
                    'name' => 'RAMOHLALE MR ',
                    'student_no' => 202046216,
                    'email' => '202046216@keyaka.ul.ac.za',
                    'password' => 'Ramohlale@46216'
                ],
                [
                    'name' => 'MAENETJA MS',
                    'student_no' => 201802522,
                    'email' => '201802522@keyaka.ul.ac.za',
                    'password' => 'Manetja@02522'
                ],
                [
                    'name' => 'MALEMA MS',
                    'student_no' => 201825027,
                    'email' => '201825027@keyaka.ul.ac.za',
                    'password' => 'Malema@25027'
                ],
                [
                    'name' => 'MOTEDI MS',
                    'student_no' => 201953869,
                    'email' => '201953869@keyaka.ul.ac.za',
                    'password' => 'Motedi@53869'
                ]
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
