require 'byebug'
require_relative 'course'

class Student
  attr_reader :course_choices, :choice_rank, :name, :sutdent_id

  include Enumerable

  def each(&block)
    @course_choices.each {|choice| block.call(choice)}
  end

  CHOICES = ['blue','green','red','yellow']

  def initialize(options = {})
    @course_choices = options[:course_choices] || CHOICES.shuffle
    @name = options[:name]
    @student_id = options[:student_id]
  end

  def [](index)
    @course_choices[index]
  end

  def []=(index, value)
    @course_choices[index] = value
  end

  def to_s
    @name
  end

  def get_placed(course)
    @choice_rank = @course_choices.index(course)
    @course = course
  end

  def ==(stu2)
    student_id == stu2.student_id
  end

  def placed?
    !!@course
  end

  def inspect
    to_s
  end

  def reset!
    @course = nil
    @choice_rank = 0
  end

end
