const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchUserData(userId) {
  console.log("1. Starting execution");
  /*
    CALL STACK: [fetchUserData] -> [console.log]
    MICROTASK QUEUE: []
  */

  try {
    const userPromise = delay(100).then(() => ({ id: userId, role: "admin" }));
    /*
      CALL STACK: [fetchUserData] -> [delay] -> [Promise constructor]
      MICROTASK QUEUE: []
      NOTE: setTimeout API is initialized. delay returns an unresolved Promise.
    */

    console.log("2. Awaiting network response");
    /*
      CALL STACK: [fetchUserData] -> [console.log]
      MICROTASK QUEUE: []
    */

    const user = await userPromise;
    /*
      CALL STACK: [fetchUserData] (pauses and pops off call stack)
      MICROTASK QUEUE: []
      NOTE: 100ms passes. setTimeout callback runs, resolving delay Promise. 
      The .then() callback executes, resolving userPromise to the user object.
      The continuation of fetchUserData is pushed to the Microtask Queue.
    */

    /*
      --- Execution Resumes ---
      CALL STACK: [fetchUserData continuation]
      MICROTASK QUEUE: []
    */

    console.log("3. User data retrieved, fetching permissions");
    /*
      CALL STACK: [fetchUserData] -> [console.log]
      MICROTASK QUEUE: []
    */

    const permissions = await Promise.resolve(["read", "write", "delete"]);
    /*
      CALL STACK: [fetchUserData] (pauses and pops off call stack)
      MICROTASK QUEUE: [fetchUserData continuation]
      NOTE: Promise.resolve() creates an instantly resolved Promise. 
      The step to resume fetchUserData is immediately placed into the Microtask Queue.
    */

    /*
      --- Execution Resumes ---
      CALL STACK: [fetchUserData continuation]
      MICROTASK QUEUE: []
    */

    console.log("4. Processing final payload");
    /*
      CALL STACK: [fetchUserData] -> [console.log]
      MICROTASK QUEUE: []
    */

    return { ...user, permissions };
    /*
      CALL STACK: [fetchUserData] (pops off call stack)
      MICROTASK QUEUE: []
      NOTE: The implicit Promise returned by fetchUserData itself now resolves 
      to the final combined object payload.
    */

  } catch (error) {
    console.log("Error encountered:", error.message);
  }
}

fetchUserData(1).then((result) => console.log("5. Operation Complete:", result));
/*
  CALL STACK: [Global Context] -> [fetchUserData(1)]
  MICROTASK QUEUE: []
  NOTE: fetchUserData runs synchronously up to the first await. 
  The final .then() callback is registered to run only when fetchUserData's 
  returned Promise fully resolves at the end of the script execution.
*/
