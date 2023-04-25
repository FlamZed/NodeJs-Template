import * as dotenv from 'dotenv';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
dotenv.config();

let supabaseClient : SupabaseClient;

const APISUPABASE = "";
const URLSUPABESE = "";
const create = function () {

    if (!supabaseClient){
        supabaseClient = createClient(process.env.URLSUPABESE || URLSUPABESE, process.env.APISUPABASE || APISUPABASE);
    }

    return supabaseClient;
}

export default create();
