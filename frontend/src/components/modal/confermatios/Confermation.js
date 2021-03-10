import React from 'react'
import { Button } from 'react-materialize'
import classes from "./confermation.module.css"

function Confermation(props) {
    return (
        <div >
            <h6  className={classes.Message}>{props.message}</h6>
                 {props.type==="DELETE"?
               <>
               <p className={classes.Title}>{props.title} ?</p>
                <Button className={classes.Button} onClick={props. deleteConfermed}>DELETE</Button>
                <Button   onClick={props.deleteCancelled}>CANCEL</Button>
               
           </>:
              <Button  className={classes.OkButton} onClick={props.confermed}>OK</Button>

        }
            
        </div>
    )
}

export default Confermation
