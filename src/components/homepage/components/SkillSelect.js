import React from "react";



const SkillSelect = ({data, dispatch, type}) => {

    return (

        <div className="skill-select">
            {data.map(level => {
                    return (
                        <div key={level.label}
                             className={level.selected ? "skill-box selected" : "skill-box"}
                             onClick={() => dispatch({type, value: level.label})}
                        >
                            <img src={level.img} alt={`Select ${level.label} Surfer`}/>
                            <h4>{level.label}</h4>
                        </div>
                        )
            }

            )}

        </div>
    )
}


export default SkillSelect
