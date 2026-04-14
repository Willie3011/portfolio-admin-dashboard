import React from 'react'
import Select from 'react-select';

const customSelectStyles = {
    control: (base, state) => ({
        ...base,
        background: "#111",
        borderColor: state.isFocused ? "#c9922a55" : "#2a2a2a",
        borderRadius: "7px",
        padding: "2px 4px",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#c9922a55",
        },
    }),
    menu: (base) => ({
        ...base,
        background: "#161616",
        border: "0.5px solid #2a2a2a",
        borderRadius: "7px",
        zIndex: 60,
    }),
    option: (base, { isFocused, isSelected }) => ({
        ...base,
        background: isSelected
            ? "#c9922a"           // selected option background
            : isFocused
                ? "#1e1a14"           // hover background
                : "transparent",
        color: isSelected
            ? "#0f0f0f"           // selected text (dark for contrast)
            : isFocused
                ? "#c9922a"
                : "#e8e2d4",
        "&:active": {
            background: isSelected ? "#c9922a" : "#1e1a14",
        },
    }),
    // Styles for selected tags (multi-value)
    multiValue: (base) => ({
        ...base,
        background: "#1e1a14",          // dark gold background for tags
        borderRadius: "5px",
        border: "0.5px solid #c9922a44",
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: "#c9922a",               // gold text
        fontSize: "12px",
        padding: "3px 6px",
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: "#c9922a",
        "&:hover": {
            background: "#c9922a",
            color: "#0f0f0f",
            borderRadius: "0 5px 5px 0",
        },
    }),
    placeholder: (base) => ({
        ...base,
        color: "#555",
    }),
    input: (base) => ({
        ...base,
        color: "#e8e2d4",
    }),
    clearIndicator: (base) => ({
        ...base,
        color: "#666",
        "&:hover": {
            color: "#c9922a",
        },
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: "#666",
        "&:hover": {
            color: "#c9922a",
        },
    }),
};

const ReactSelect = ({...props}) => {
  return (
      <Select
          {...props}
          styles={customSelectStyles}
          theme={(theme) => ({
              ...theme,
              colors: {
                  ...theme.colors,
                  primary: "#c9922a",        // focus ring / selected option background
                  primary25: "#2a2a2a",      // hover background for options
                  neutral0: "#111",          // dropdown background
                  neutral80: "#e8e2d4",      // text color
                  neutral20: "#2a2a2a",      // border color
                  neutral30: "#c9922a55",    // border focus
              },
          })}
      />
  )
}

export default ReactSelect