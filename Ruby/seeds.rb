require 'faker'
require_relative 'placement'
require_relative 'student'
require_relative 'course'

class Seed

  def self.lotr_students(num, courses)
    result = []
    Faker::LordOfTheRings.unique.clear
    num.times do
      result << Student.new(
        name: Faker::LordOfTheRings.unique.character,
        student_id: rand(1000),
        course_choices: courses.shuffle
      )
    end
    result
  end

  def self.lotr_courses(num)
    result = []
    num.times do
      result << Course.new(
      Faker::LordOfTheRings.location,
      rand(10..20)
    )
    end
    result
  end

  def self.color_classes(num)
    Student::CHOICES.map {|color| Course.new(color, num)}
  end

  def self.students(num, courses)
    result = []
    Faker::Name.unique.clear
    num.times do
      result << Student.new(
        name: Faker::Name.unique.name,
        student_id: rand(1000),
        course_choices: courses.shuffle
      )
    end
    result
  end

end
