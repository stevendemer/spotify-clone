/**
 * Hook shows which props cause re-rendering
 * Accepts the component name and its props
 */
import { useEffect, useRef } from "react";

export const useWhyDidYouUpdate = (name, props) => {
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      // get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // use this object to keep track of changed props
      const changesObj = {};

      // iterate through the keys
      allKeys.forEach((key) => {
        // if previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // add to change object
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      // If changesobject is not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log("[why-did-you-update]", name, changesObj);
      }
    }
    // update the previous props for next hook call
    previousProps.current = props;
  });
};
