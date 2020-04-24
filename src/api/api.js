import axios from 'axios';
import 
function Api(){
    axios.defaults.baseURL = 'http://192.168.1.188:12'; 
    this.get=(url,queryObj)=>{
        let index = url.indexOf('?');
        let timespan = new Date().getTime();
        url = (index==-1)?(url+"?timespan="+timespan):(url+"&timespan="+timespan);
        return service.get(url,{
            params:{
                ...(queryObj||{})
                }
              })
            }
        
            this.post=(url,data,queryObj)=>{
                let index = url.indexOf('?');
                let timespan = new Date().getTime();
                url = (index==-1)?(url+"?timespan="+timespan):(url+"&timespan="+timespan);
                return service.post(url,data||{},{
                    params:{
                        ...(queryObj||{})
                    }
                })
            }
        
            this.all=(...data)=>{
                 return axios.all(data).then(axios.spread((...res)=>{
                    return res.map((item)=>item.data)
                }))
            }
}