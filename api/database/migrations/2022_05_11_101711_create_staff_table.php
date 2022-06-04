<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->string('staff_no');
            $table->string('name');
            $table->string('password');
            $table->timestamps();
        });

        DB::table('staff')->insert(
            [     
                [
                    'staff_no' => 202012345,
                    'name' => 'Maja MM',
                    'password' => 'Test@123'
                ],     
                [ 
                    'staff_no' => 202011111,
                    'name' => 'Diale ML',
                    'password' => 'Test@123'
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
        Schema::dropIfExists('staff');
    }
}
