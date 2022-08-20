// use works like an import, we import things from the anchor library
use anchor_lang::prelude::*;

// program id, anchor generated that, info for solana how to run the program
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

// everything below this line is our program, we'll create some handlers to communicate with the program
// it's a macro that attach code to the module, it's like "inheriting" a class
#[program]
pub mod solana { // module declaration, similar to a class from OOP
    use super::*; // inheriting? 

    // an initialization function, that takes a function and return Ok which is a Result type
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
