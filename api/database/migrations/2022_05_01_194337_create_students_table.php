<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('student_no');
            $table->timestamps();
        });

        DB::table('students')->insert(
            [     
                [
                    'student_no' => 202017199
                ],     
                [ 
                    'student_no' => 201910340
                ],
                [
                    'student_no' => 201922174
                ],
                [
                    'student_no' => 201907684 
                ],
                [
                    'student_no' => 202045673
                ],
                [
                    'student_no' => 202046216
                ],
                [
                    'student_no' => 201802522
                ],
                [
                    'student_no' => 201825027
                ],
                [
                    'student_no' => 201953869
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
        Schema::dropIfExists('students');
    }
}
