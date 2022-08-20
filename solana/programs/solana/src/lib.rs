// use works like an import, we import things from the anchor library
use anchor_lang::prelude::*;

// program id, anchor generated that, info for solana how to run the program
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

// everything below this line is our program, we'll create some handlers to communicate with the program
// it's a macro that attach code to the module, it's like "inheriting" a class
#[program]
pub mod solana {
    // module declaration, similar to a class from OOP

    use super::*; // inheriting?

    // an initialization function, that takes a function and return Ok which is a Result type
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // Get a mutable reference to the base account. It allows to change the base_account instead of working on a local copy.
        let base_account = &mut ctx.accounts.base_account;

        // Initialize total_messages property
        base_account.total_waves = 0;

        Ok(())
    }

    pub fn add_wave(ctx: Context<AddWave>, wave: String) -> Result<()> {
        // Get a reference to the account and increment total_messages.
        let base_account = &mut ctx.accounts.base_account;
        let user = &mut ctx.accounts.user;

        let new_wave = Wave {
            wave: wave.to_string(),
            user_address: *user.to_account_info().key,
        };

        base_account.waves_list.push(new_wave);
        base_account.total_waves += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // we tell SOLANA how we want to initialize the BaseAccount
    // init - create a new account owned by the current program
    // payer = user - who pays for the account to be created, in this case the user
    // it allocates 9000 bytes of space for the account.
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    // Data passed to the program that proves that the user calling this program owns their wallet account.
    pub user: Signer<'info>,

    //Reference to the SystemProgram which basically runs SOLANA. It creates accounts on SOLANA.
    pub system_program: Program<'info, System>,
}

// Create Context that has access to a mutable reference to base_account.
#[derive(Accounts)]
pub struct AddWave<'info> {
    #[account(mut)] // Access to a mutable reference to base_account
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
}

// It tells Anchor how to serialize/deserialize the struct. Data is stored in an "account", it's just a file and we serialize the data into a binary format before storing it.
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Wave {
    pub wave: String,
    pub user_address: Pubkey,
}

// It tells the program what kind of account it can make and what to hold inside of it. Here, BaseAccount holds one thing and it's an unsigned integer.
#[account]
pub struct BaseAccount {
    pub total_waves: u64,
    pub waves_list: Vec<Wave>,
}
