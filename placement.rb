require 'byebug'
require 'faker'
require_relative 'course'
require_relative 'student'
require_relative 'seeds'

class Placement

  def self.seed_with_color_classes(course_size)
    courses = Seed.color_classes(course_size)
    Placement.new(Seed.students(16, courses), courses)
  end

  attr_reader :students, :courses, :choice_count

  def initialize(students = nil, courses = nil)
    @students = students
    @choice_count = 0
    @courses = courses
  end

  def place_students(max_choice)
    @students.shuffle!
    @students.each do |student|
      place_student(student, max_choice)
    end
    all_students_placed?
  end

  def place_student(student, max_choice)
    i = 0
    until student.placed?
      course = student[i]
      course.add_student(student) unless course.full?
      i += 1
      raise "Student Not Placed" if i == max_choice + 1
    end
    @choice_count += i
  end

  def to_s
    students = "Students: #{@students.map {|stu| stu.to_s}}"
    courses = "Courses: #{@courses.map {|clas| clas.to_s}}"
    "#{students} \n #{courses}"
  end

  # collect data on which courses were most popular

  def popularities
    result = {}
    @courses.each do |cl|
      result[cl.name] = Hash.new(0)
    end
    @students.each do |student|
      student.each_with_index do |course_choice, i|
        result[course_choice.name][i] += 1
      end
    end
    result
  end

  def parse_popularities
    pops = popularities
    str = ""
    pops.each do |course_name, count_hash|
      str += "#{course_name}: \n"
      count_hash.each do |place, number|
        str += "#{number} students picked this at place #{place + 1}\n"
      end
    end
    str
  end

  def all_students_placed?
    @students.all? {|student| student.placed?}
  end

  def reset!
    @students.each do |student|
      student.reset!
    end
    @courses.each do |course|
      course.empty!
    end
    @choice_count = 0
  end

  def print_courses
    str = ""
    @courses.each do |course|
      str += "#{course.name} has #{course.number_of_students}"
    end
  end


end
