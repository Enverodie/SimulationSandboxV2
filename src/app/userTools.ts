import { JsxElement } from "typescript";

enum Option_Type {}

interface Tool_Option {
    name: string,
    type: Option_Type,
    option_options?: any[],
    action: (...args: any[]) => void,

}

interface User_Tool {
    clickOn: () => void,
    clickOff: () => void,
    toolTip?: JsxElement,
    options: Tool_Option[],
}

/* Property name matters here - will be used in UI. Uppercase words, use _ as space */
const USER_TOOLS = {
    Life: {
        Create_Or_Edit: 0,
        Draw_On_Board: {
            Add_Life: 0,
            Remove_Life: 0
        },
    },
    Display_Manipulation: {
        Grab: 0,
        Zoom: {
            Zoom_In: 0,
            Zoom_Out: 0
        }
    },
    Board_State: {
        Manipulate: {
            File: {
                Save: 0,
                Load: 0
            },
            Clear: 0
        },
        Capture: {
            Screenshot: 0,
            Record: 0
        }
    },
    Play_Pause: 0
}

export default USER_TOOLS;