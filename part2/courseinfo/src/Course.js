const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <h3>Number of exercises {sum.reduce((s, p) => s + p.exercises, 0)}</h3>

const Part = ({ part }) =>
	<p>
		{part.name} {part.exercises}
	</p>

const Content = ({ courses }) => {
	return (
		courses.map((course) => {
			return (
				<div key={course.id}>
					<h2 > {course.name} </h2>
					{course.parts.map((part) => <Part key={part.id} part={part} />)}
					<Total sum={course.parts} />
				</div>
			)
		}))
}


const Course = ({ course }) =>
	<div>
		<Header course={"Web development curriculum"} />
		<Content courses={course} />
	</div>

export default Course