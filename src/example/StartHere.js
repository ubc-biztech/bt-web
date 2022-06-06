///  ____ _____  _    ____ _____   _   _ _____ ____  _____
/// / ___|_   _|/ \  |  _ \_   _| | | | | ____|  _ \| ____|
/// \___ \ | | / _ \ | |_) || |   | |_| |  _| | |_) |  _|
///  ___) || |/ ___ \|  _ < | |   |  _  | |___|  _ <| |___
/// |____/ |_/_/   \_\_| \_\|_|   |_| |_|_____|_| \_\_____|
///
/// We will be using the Model-View-Controller (MVC) architecture pattern for the
/// CLEANEST codebase ever (knock on wood). This guide will take you through
/// each segment of example implementation to give you a better
/// understanding of how the M, V, and C work cohesively.
///
/// There is a number on the screen and the user presses a button that
/// increments it, this is what happens behind the scenes:
///   1. The View's Button tells the Controller that the button has been pressed.
///   2. The Controller increments the number that is contained in the Model.
///   3. The Controller tells the View that the number in the Model has changed.
///   4. The View then shows the incremented number.
///
/// Visually, it looks like this:
///   View <--> Presenter <--> Model
///
/// The MVC is best used for classed based programming but here we can see the pattern for functional programming
/// by breaking down the component and abstratcing the logic from the view from the model.
///
/// To start please head to TimerController.js!

/// SO to Adin for writing this, tweaked it a bit from the mobile BizTech app