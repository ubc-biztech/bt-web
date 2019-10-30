// code taken from https://serverless-stack.com/chapters/create-a-custom-react-hook-to-handle-form-fields.html

import { useState } from "react";

export function useFormFields(initialState) {
    const [fields, setValues] = useState(initialState);

    return [
        fields,
        function (event) {
            setValues({
                ...fields,
                [event.target.id]: event.target.value
            });
        }
    ];
}