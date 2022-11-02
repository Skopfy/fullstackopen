const Course = ({course}) => {

    const Header = ({ title }) => <h2>{title}</h2>


    const Part = ({ part }) => 
	  <p>
	  {part.name} {part.exercises}
    </p>

    return (
	    <>
	    <Header title={course.name}/>

            {course.parts.map(part => 
		    <Part key={part.id} part={part}/>
            )}

	    <p> Total: 
	{course.parts.reduce(
	    (sum, part) => sum + part.exercises,
	    0
	)}
		    
            </p>
	    </>
    )

}

export default Course
