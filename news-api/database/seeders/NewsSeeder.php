<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\News;
use Faker\Factory as Faker;

class NewsSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 30; $i++) {
            News::create([
                'title' => $faker->sentence,
                'summary' => $faker->paragraph,
                'article_date' => $faker->date,
                'publisher' => $faker->company,
            ]);
        }
    }
}