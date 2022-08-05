const Orders = () => {
   return (
      <div className="row">
         <div className="col lg-12 md-12 sm-12">
            <div className="row">
               <div className="col lg-12 md-12 sm-12">
                  <h2>Orders</h2>
               </div>
            </div>
            <div className="row">
               <div className="col lg-12 md-12 sm-12">
                  <table class="content-table w-100pc">
                     <thead>
                        <tr>
                           <th>Rank</th>
                           <th>Name</th>
                           <th>Points</th>
                           <th>Team</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>1</td>
                           <td>Domenic</td>
                           <td>88,110</td>
                           <td>dcode</td>
                        </tr>
                        <tr>
                           <td>2</td>
                           <td>Sally</td>
                           <td>72,400</td>
                           <td>Students</td>
                        </tr>
                        <tr>
                           <td>3</td>
                           <td>Nick</td>
                           <td>52,300</td>
                           <td>dcode</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Orders 