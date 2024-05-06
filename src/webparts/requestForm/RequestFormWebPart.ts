import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './RequestFormWebPart.module.scss';
import * as strings from 'RequestFormWebPartStrings';
import { Web }  from 'sp-pnp-js';

export interface IRequestFormWebPartProps {
  description: string;
}

export default class RequestFormWebPart extends BaseClientSideWebPart<IRequestFormWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  public render(): void {
    this.domElement.innerHTML = `
    <section class="${styles.requestForm} ${!!this.context.sdks.microsoftTeams ? styles.teams : ''}">
      <div>
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      
    
    <div>

        <div>
            <div role="tabpanel" class="tab-pane active" id="InstructionPanel"> 
            
                <div style="background-color:#0099cc; color: white; padding-left: 35px;padding-right: 35px;">
                        </br>
                        <h3  style="padding-top: -95px;"><strong> <img role="img" aria-hidden="true" src="https://lists.office.com/Images/a641b6d7-15cd-4d00-84d1-f5c3903fc026/6621c261-8882-49f9-8fa8-2ebbc41cc5a2/TD3E3A68RPSKSHQG9G6ODMJRRD/840fd329-7823-4b98-accb-fe418f6d3e8f" height="70" width="157" style="left: -10px; top: 0px; border: 0px; vertical-align: middle; position: relative;">
                        Gifts, Hospitality, and Business Courtesies Declaration and Request for Approval</strong></h3>
                        </br>

                  <div class="--h-35" data-automation-id="formSubTitle" id="SubTitleId_subtitleAriaId"><span class="text-format-content ">
                      <br><span><u><b>Introduction</b></u></span><br><br>
                      <span>Please complete this form to request approval to give or receive a gift or hospitality and/or to register a gift or hospitality you are giving or receiving. Please refer to NMC’s<span>&nbsp;</span>
                      <span>Gifts, Hospitality, and Business Courtesies Policy</span><span>&nbsp;</span>and the Decision Tree to better understand when you need to <span>obtain prior approval to give or receive a gift or hospitality and when you only need to&nbsp;</span>register it – this should be done prior to accepting or giving any gift or hospitality. The information you provide will aid in assessing the appropriateness and compliance of such gift or hospitality. Therefore, you are expected to answer these questions to the best of your ability.</span><br><br>
                      <span>Your cooperation is essential in maintaining NMC’s commitment to ethical practices and ensuring compliance with policies and regulatory obligations.</span><br><br>
                      <u><b>Instruction</b></u><br><br><span>
                     </span>
                      <span> Please follow these steps to complete the form:</span><br><br>
                      <ol><li><span><span>Read and appropriately respond to each required question in the form.</span><br></span>
                      </li><li><span>Review all your responses to ensure the accuracy and completeness of the information provided.</span><br></li>
                      <li><span>Once you have finished your review, click "Submit" at the bottom of the page. You will not have this option until you have completed all the required questions and sections.</span><br></li>
                      <li><span>If you are only required to register the gifts or hospitality, this will be the end and you may proceed to give or accept the gift or hospitality. If approval is required, the request will be sent to your manager for approval. Once they review the request, it will come to the Ethics &amp; Compliance Office. Please wait to receive&nbsp;an email notification of final approval before proceeding to give/offer or accept the gift or hospitality.&nbsp; &nbsp;&nbsp;</span><br></li></ol><br>
                       For questions, or issues with completing the form, please email <span style="color: rgb(81, 167, 249);"><b><a href="mailto:ethicscompliance@nmc.ae" style="color: white; text-decoration: underline;" class="linkified">ethicscompliance@nmc.ae</a></b>
                       </span><b>.</b>
                       </span>

                       </br>
                       </br>
                   </div>
                </div>
                <div style="background-color:powderblue; padding-left: 45px;">
                   &nbsp; &nbsp;   <h5><span style=" color: red;">*</span> Required</h5>

                   &nbsp; &nbsp; <h3 style="color: #2CAFE0;"><strong>Requestor's Information</strong></h3> </br>

                   &nbsp; <strong> This Form will recorded your name , please fill you name  <span style=" color: red;">*</span></strong> </br>
                   <input Id="Name" placeholder="Enter your Name" required style="width: 95%;" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"> 
 
                   <span id="NameValidation" style="color: red;" >  This question is required.</span> </br></br>

                  &nbsp; <strong> 1. Please state your name <span style=" color: red;">*</span></strong> </br>
                  <input Id="statename" placeholder="Enter your state" required style="width: 95%;" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"> 

                  <span id="statenameValidation" style="color: red;" >  This question is required.</span> </br></br>

                  &nbsp;<strong>  2. Please state your professional designation/title <span style=" color: red;">*</span> </strong> </br>
                  <input Id="professionaldesignation" placeholder="Enter your professional designation" required style="width: 95%;" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">

                  <span id="professionaldesignationValidation" style="color: red;" >  This question is required.</span> </br></br>

                  &nbsp;<strong> 3. Please provide your NMC email address <span style=" color: red;">*</span> </strong></br>
                   <input Id="NMCemailID"  placeholder="test@gmail.com" required style="width: 95%;" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">

                   <span id="NMCemailIDValidation" style="color: red;" >  This question is required.</span> </br></br>

                   &nbsp;<strong>  4. Please provide your ERP Number <span style=" color: red;">*</span> </strong> </br>
                   <input Id="ERPNumber" required style="width: 95%;" type="number" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">  

                   <span id="ERPNumberValidation" placeholder="000000" style="color: red;" >  This question is required.</span> </br></br>

                   &nbsp;<strong>  5. Please provide your manager's email address <span style=" color: red;">*</span> </strong></br>
                   <input Id="manageremailID" placeholder="test@gmail.com" required style="width: 95%;" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">   

                   <span id="manageremailIDValidation" style="color: red;" >  This question is required.</span> </br></br>


                  </br></br>
                  <a style="width: 100px;" id="InstructionNext" class="btn btn-primary continue">Next</a>


                <div style="float: right; padding-right: 35px;">
                 <span>Page 1 of 6</span>
                    <div style="height: 7px; width:250px; border-radius: 0.125rem; background-color: #ccc; color: #fff;">
                      <div style="height: 100%; border-radius: 0.125rem; background-color: #007bff; color: #fff; width: 20%;"></div>
                    </div>
                 </div>
            

                  </br>  </br>
                  <div  style="left: 0px; top: 10px; border: 0px;" class="-a-262">Never give out your password.<a class="css-264" tabindex="0" role="link">Report abuse</a></div>
                  </br> </br> 

                </div>
            </div>




<!--  Next Panel  -->




            


            <div role="tabpanel" class="tab-pane" id="NaturePanel">

                <div style="height: 150px; background-color:#2CAFE0; padding-left: 45px;padding-right: 35px;">
                    </br>
                   <h3  style="padding-top: -95px;"><strong>   <img role="img" aria-hidden="true" src="https://lists.office.com/Images/a641b6d7-15cd-4d00-84d1-f5c3903fc026/6621c261-8882-49f9-8fa8-2ebbc41cc5a2/TD3E3A68RPSKSHQG9G6ODMJRRD/840fd329-7823-4b98-accb-fe418f6d3e8f" height="50" width="117" style="left: 0px; top: 0px; border: 0px; vertical-align: middle; position: relative;">
                    Gifts, Hospitality, and Business Courtesies Declaration and Request for Approval Form </strong></h3>
                    </br>
                </div>


               


                <div style="background-color:powderblue; padding-left: 35px;">
                  &nbsp; &nbsp;   <h5><span style=" color: red;">*</span> Required</h5>

                  &nbsp; &nbsp; <h4 style="color: #2CAFE0;"><strong>Nature of Request</strong></h4> </br>

                  <strong>6. Are you giving or receiving? <span style="color: red;">*</span></strong><br /><br />
                  <input type="radio" class="btn-check" name="givingreceiving" id="givingreceivinggiving" value="giving" autocomplete="off" checked>
                  <label class="btn btn-outline-primary" for="givingreceivinggiving">Giving</label><br />
                  <input type="radio" class="btn-check" name="givingreceiving" id="givingreceivingreceiving" value="receiving" autocomplete="off">
                  <label class="btn btn-outline-primary" for="givingreceivingreceiving">Receiving</label><br /><br />

                  </br></br>            
                  <a style="width: 100px;" id="NatureBack" class="btn btn-primary back">Back</a>
                  <a style="width: 100px;" id="NatureNext" class="btn btn-primary continue">Next</a> 
                  
                  <div style="float: right; padding-right: 35px;">
                 <span>Page 2 of 6</span>
                    <div style="height: 7px; width:250px; border-radius: 0.125rem; background-color: #ccc; color: #fff;">
                      <div style="height: 100%; border-radius: 0.125rem; background-color: #007bff; color: #fff; width: 40%;"></div>
                    </div>
                 </div>

                 </br>  </br>
                 <div  style="left: 0px; top: 10px; border: 0px;" class="-a-262">Never give out your password.<a class="css-264" tabindex="0" role="link">Report abuse</a></div>
                 </br> </br> 

                </div>            
            </div>


<!--  Next Panel  -->


            <div role="tabpanel" class="tab-pane" id="GivingPanel">
              
              
                <div style="height: 150px; background-color:#2CAFE0; padding-left: 45px;padding-right: 35px;">
                   </br>
                       <h3  style="padding-top: -95px;"><strong>   <img role="img" aria-hidden="true" src="https://lists.office.com/Images/a641b6d7-15cd-4d00-84d1-f5c3903fc026/6621c261-8882-49f9-8fa8-2ebbc41cc5a2/TD3E3A68RPSKSHQG9G6ODMJRRD/840fd329-7823-4b98-accb-fe418f6d3e8f" height="50" width="117" style="left: 0px; top: 0px; border: 0px; vertical-align: middle; position: relative;">
                       Gifts, Hospitality, and Business Courtesies Declaration and Request for Approval Form </strong></h3>
                   </br>
               </div>


                <div style="background-color:powderblue; padding-left: 45px;">
                      &nbsp; &nbsp;   <h5><span style=" color: red;">*</span> Required</h5>

                      &nbsp; &nbsp; <h4 style="color: #2CAFE0;"><strong>Giving Gift or Hospitality</strong></h4> </br>


    

                      <strong>  7. Enter the date you intend to give the gift, or if hospitality, when will it take place ? <span style=" color: red;">*</span> </strong> </br></br>
                      <input id="giveDate" required style="width: 95%;" type="date" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                       </br>
   
   
                      <strong> 8. Is the recipient a public official ? <span style=" color: red;">*</span></strong> </br>
                      &nbsp; &nbsp; &nbsp; &nbsp; This means, physicians, use, and another NMC employ that is licensed by a health authority </br>
                      
                      </span>
                      <span> Public official means means an employee, official, candidate for, or member of government agencies, departments, whether elected or appointed, which include, without limitation:</span><br><br>
                      <ol><li><span><span>doctors and healthcare professionals (including nurses, lab personnel and their staff),working for government-owned or controlled hospitals and universities</span><br></span>
                      </li><li><span>public health officials</span><br></li>
                      <li><span>customs and importation officials</span><br></li>
                      <li><span>healthcare regulators</span><br></li>
		                   <li><span> public international organisations; and </span><br>
		                    <li><span> family members of any of the above </span><br>
		                	</li></ol><br>
                 </span>
                      
                      <input type="radio" class="btn-check" name="ReciPubcOffi" id="ReciPubcOffiyes" autocomplete="off" value="YES">
                      <label class="btn btn-outline-primary" for="ReciPubcOffiyes">YES</label></br>
                      <input type="radio" class="btn-check" name="ReciPubcOffi" id="ReciPubcOffiNo" value="NO" autocomplete="off">
                      <label class="btn btn-outline-primary" for="ReciPubcOffiNo">NO</label>
                     </br>
        


                   </br></br>            

                         <a style="width: 100px;" id="GivingBack" class="btn btn-primary back">Back</a>
                         <a style="width: 100px;" id="GivingNext" class="btn btn-primary continue">Next</a>
                         
                         

                    <div style="float: right; padding-right: 35px;">
                         <span>Page 3 of 6</span>
                       <div style="height: 7px; width:250px; border-radius: 0.125rem; background-color: #ccc; color: #fff;">
                          <div style="height: 100%; border-radius: 0.125rem; background-color: #007bff; color: #fff; width: 60%;"></div>
                       </div>
                    </div>

                 </br>  </br>
                 <div  style="left: 0px; top: 10px; border: 0px;" class="-a-262">Never give out your password.<a class="css-264" tabindex="0" role="link">Report abuse</a></div>
                 </br> </br> 

                  </div>

              </div>




<!--  Next Panel  -->

            <div role="tabpanel" class="tab-pane" id="ReceivingPanel">
              
                <div style="height: 150px; background-color:#2CAFE0; padding-left: 45px;padding-right: 35px;">
                  </br>
                  <h3  style="padding-top: -95px;"><strong>   <img role="img" aria-hidden="true" src="https://lists.office.com/Images/a641b6d7-15cd-4d00-84d1-f5c3903fc026/6621c261-8882-49f9-8fa8-2ebbc41cc5a2/TD3E3A68RPSKSHQG9G6ODMJRRD/840fd329-7823-4b98-accb-fe418f6d3e8f" height="50" width="117" style="left: 0px; top: 0px; border: 0px; vertical-align: middle; position: relative;">
                   Gifts, Hospitality, and Business Courtesies Declaration and Request for Approval Form </strong></h3>
                   </br>
                </div>


                <div style="background-color:powderblue; padding-left: 45px;">
                   &nbsp; &nbsp;   <h5><span style=" color: red;">*</span> Required</h5>

                   &nbsp; &nbsp; <h4 style="color: #2CAFE0;"><strong>Receiving Gift or Hospitality</strong></h4> </br>


              
                   <strong>  7. Enter the date you received or will receive the gift, or it hospitality, when will it take place ? <span style=" color: red;">*</span> </strong> </br></br>
                   <input id="receivedDate" required style="width: 95%;" type="date" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                    </br>


                   <strong> 8. Are you a healthcare professional ? <span style=" color: red;">*</span></strong> </br>
                   &nbsp; &nbsp; &nbsp; &nbsp; This means, physicians, use, and another NMC employ that is licensed by a health authority </br>
                   <input type="radio" class="btn-check" name="healthcareP" id="healthcarePyes" autocomplete="off" value="YES">
                   <label class="btn btn-outline-primary" for="healthcarePyes">YES</label></br>
                   <input type="radio" class="btn-check" name="healthcareP" id="healthcarePNo" value="NO" autocomplete="off">
                   <label class="btn btn-outline-primary" for="healthcarePNo">NO</label>
                  </br>

            <span id="SpangifthospiPatient" style="display: none;" >
                  <strong> 9. Is the gift or hospitality from a patient, pharmaceutical or medical device manufacturer or their representatives ? <span style=" color: red;">*</span></strong> </br>
                  &nbsp; &nbsp; &nbsp; &nbsp; Please remember that an event activity where the giver will not be in attendance is a gift. </br>
                  <input type="radio" class="btn-check" name="gifthospiPatient" id="gifthospiPatientYES" autocomplete="off" value="YES">
                  <label class="btn btn-outline-primary" for="gifthospiPatientYES"> YES</label></br>
                  <input type="radio" class="btn-check" name="gifthospiPatient" id="gifthospiPatientNO" value="NO" autocomplete="off">
                  <label class="btn btn-outline-primary" for="gifthospiPatientNO">NO</label>
                 </br>
             </span>



                  
              <span id="SpangiftHospitality" style="display: none;" >
                   <strong> 9. Is this a gift or hospitality? <span style=" color: red;">*</span></strong> </br>
                   &nbsp; &nbsp; &nbsp; &nbsp; Please remember that an event activity where the giver will not be in attendance is a gift. </br>
                   <input type="radio" class="btn-check" name="giftHospitality" id="GifgiftHospitalitygift" autocomplete="off" value="Gift">
                   <label class="btn btn-outline-primary" for="GifgiftHospitalitygift"> Gift</label></br>
                   <input type="radio" class="btn-check" name="giftHospitality" id="giftHospitalityHospitality" value="Hospitality" autocomplete="off">
                   <label class="btn btn-outline-primary" for="giftHospitalityHospitality">Hospitality</label>
                  </br>
              </span>


              <span id="SpangiftExAED" style="display: none;">
                   <strong>  10. Does the value of the gift exceed AED 100 ?  <span style=" color: red;">*</span></strong> </br>
                   <input type="radio" class="btn-check" name="giftExAED" id="giftExAEDyes" autocomplete="off" value="YES">
                   <label class="btn btn-outline-primary" for="giftExAEDyes">YES</label></br>
                   <input type="radio" class="btn-check" name="giftExAED" id="giftExAEDno" value="NO" autocomplete="off">
                   <label class="btn btn-outline-primary" for="giftExAEDno">NO</label>
                  </br>
               </span>


           <span id="SpanhospitalityAED" style="display: none;"> 
               <strong>  10. Does the value of the hospitality exceed AED 500 ?     <span style=" color: red;">*</span></strong> </br>
               <input type="radio" class="btn-check" name="hospitalityAED" id="hospitalityAEDyes" autocomplete="off" value="YES">
               <label class="btn btn-outline-primary" for="hospitalityAEDyes">YES</label></br>
               <input type="radio" class="btn-check" name="hospitalityAED" id="hospitalityAEDno" value="NO" autocomplete="off">
               <label class="btn btn-outline-primary" for="hospitalityAEDno">NO</label>
              </br>
           </span>


          <span id="SpanPriorApprovISneed" style="display: none;"> 
            <strong>  11. Prior approval IS needed to receive this gift or hospitality. Please complete the rest of the form and wait until you receive approval from the Ethics and Compliance Office. Do you understand that prior approval is required ? <span style=" color: red;">*</span></strong> </br>
             <input type="radio" class="btn-check" name="PriorApprovISneed" id="PriorApprovISneedyes" autocomplete="off" value="YES">
            <label class="btn btn-outline-primary" for="PriorApprovISneedyes">YES</label></br>
             </br>
          </span>




                 <span id="Spannoncash">
                         <strong>11. Is the gift non-cash or non-cash equivalent and does it: </strong><span style=" color: red;">*</span></br>
                          &nbsp; &nbsp; &nbsp; &nbsp; 1. have a medical purpose;</br>
                           &nbsp; &nbsp; &nbsp; &nbsp; 2. relate to the NMC business and</br>
                            &nbsp; &nbsp; &nbsp; &nbsp; 3. benefit patients or serves genuine educational or clinical practical function?</br>
                           &nbsp; &nbsp; &nbsp; &nbsp; Canh equivalent means any form of comparation, assets, or payments that can be easily converted </br>
                           &nbsp; &nbsp; &nbsp; &nbsp; to a known amount of cash (eg, vouchers, gift cards, treasury bills, etc.)  </br>
                         <input type="radio" class="btn-check" name="noncash" id="noncashyes" autocomplete="off" value="YES">
                         <label class="btn btn-outline-primary" for="noncashyes">YES</label></br>
                         <input type="radio" class="btn-check" name="noncash" id="noncashno" value="NO" autocomplete="off">
                         <label class="btn btn-outline-primary" for="noncashno">NO</label>
                        </br>
                 </span>

                  <span id="SpanNMCgiftHospitality">
                        <strong> 12. This is not permitted under NMC's Gift, Hospitality, and Business Courtesies Policy. Is this a gift or hospitality ? </strong> </strong><span style=" color: red;">*</span> </br>
                        <input type="radio" class="btn-check" name="NMCgiftHospitality" id="NMCgiftHospitalityGift" value="Gift" autocomplete="off">
                        <label class="btn btn-outline-primary" for="NMCgiftHospitalityGift"> Gift</label></br>
                        <input type="radio" class="btn-check" name="NMCgiftHospitality" id="NMCgiftHospitalityHospitality" value="Hospitality" autocomplete="off">
                        <label class="btn btn-outline-primary" for="NMCgiftHospitalityHospitality">Hospitality</label>
                       </br>
                  </span>

                  <span id="Spangiftreceived">
                        <strong>13. If this is a gift and you have already received it but it would be impossible or offensive to return it. Kindly submit it to the Corporate Marketing
                        and Communications team who will either donate it to a nonprofit or charitable organisation or distribute it to a large group of employees by means of a raffle draw or some similar method. 
                         You should also inform the giver in writing about what you have done and NMC's policy on the subject. 
                          Have you submitted the gift to the Corporate Marketing and Communications team ?  </strong></br>
                        <input type="radio" class="btn-check" name="giftreceived" id="giftreceived" value="YES" autocomplete="off">
                        <label class="btn btn-outline-primary" for="giftreceived">YES</label></br>
                        <input type="radio" class="btn-check" name="giftreceived" id="healthcareP" value="NO" autocomplete="off">
                        <label class="btn btn-outline-primary" for="healthcareP">NO</label>
                  </span>

                  </br></br>            

                      <a style="width: 100px;" id="ReceivingBack" class="btn btn-primary back">Back</a>
                      <a style="width: 100px;" id="ReceivingNext" class="btn btn-primary continue">Next</a>
                      
                             

                    <div style="float: right; padding-right: 35px;">
                    <span>Page 3 of 6</span>
                  <div style="height: 7px; width:250px; border-radius: 0.125rem; background-color: #ccc; color: #fff;">
                     <div style="height: 100%; border-radius: 0.125rem; background-color: #007bff; color: #fff; width: 40%;"></div>
                  </div>
               </div>

                </br>  </br>
                <div  style="left: 0px; top: 10px; border: 0px;" class="-a-262">Never give out your password.<a class="css-264" tabindex="0" role="link">Report abuse</a></div>
                 </br> </br> 

            </div>
        </div>




<!--  Next Panel  -->




        <div role="tabpanel" class="tab-pane" id="DisclosurePanel">

            <div style="height: 150px; background-color:#2CAFE0; padding-left: 45px;padding-right: 35px;">
             </br>
               <h3  style="padding-top: -95px;"><strong>   <img role="img" aria-hidden="true" src="https://lists.office.com/Images/a641b6d7-15cd-4d00-84d1-f5c3903fc026/6621c261-8882-49f9-8fa8-2ebbc41cc5a2/TD3E3A68RPSKSHQG9G6ODMJRRD/840fd329-7823-4b98-accb-fe418f6d3e8f" height="50" width="117" style="left: 0px; top: 0px; border: 0px; vertical-align: middle; position: relative;">
               Gifts, Hospitality, and Business Courtesies Declaration and Request for Approval Form </strong></h3>
               </br>
            </div>

            <div style="background-color:powderblue; padding-left: 35px;">
               &nbsp; &nbsp;   <h5><span style="color: red;">*</span> Required</h5>

               &nbsp; &nbsp; <h4 style="color: #2CAFE0;"><strong>Disclosure Details (giving)</strong></h4> </br>

               <strong>  14. First and last name(s) of the recipient </strong><span style="color: red;">*</span><br />
               &nbsp; &nbsp; &nbsp; &nbsp; If there is more than one recipient from one organisation, separate each rame with a comma.<br />  &nbsp; &nbsp; &nbsp; &nbsp; If there is more than or organisation, complete a separate form for each organisation
               <input Id="FirstAndLastNameRecipient" required style="width: 95%;" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">  </br>


               <strong>   15. Recipient's professional title   <span style="color: red;">*</span> </strong>  <br />
               <input Id="RecipientProfessionalTitle" required style="width: 95%;" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">  </br>



               <strong>   16. Please select the organisation's relationship to NMC (select as appropriate)   <span style="color: red;">*</span> </strong>  <br />

               <input type="radio" class="btn-check" name="org_rel_to_NMC" id="SupplierVendor" value="Supplier/Vendor" autocomplete="off">
               <label class="btn btn-outline-primary" for="SupplierVendor">Supplier/Vendor</label></br>
               <input type="radio" class="btn-check" name="org_rel_to_NMC" id="BusinessPartner" value="Business Partner" autocomplete="off">
               <label class="btn btn-outline-primary" for="BusinessPartner">Business Partner</label> <br />
               <input type="radio" class="btn-check" name="org_rel_to_NMC" id="CorporateClient" value="Corporate Client" autocomplete="off">
               <label class="btn btn-outline-primary" for="CorporateClient">Corporate Client</label> <br />
               <input type="radio" class="btn-check" name="org_rel_to_NMC" id="ProspectiveBusines" value="Prospective Busines" autocomplete="off">
               <label class="btn btn-outline-primary" for="ProspectiveBusines">Prospective Busines</label> <br />
               <input type="radio" class="btn-check" name="org_rel_to_NMC" id="ProspectiveCorporateClient" value="Prospective Corporate Client" autocomplete="off">
               <label class="btn btn-outline-primary" for="ProspectiveCorporateClient">Prospective Corporate Client</label> <br />
               <input type="radio" class="btn-check" name="org_rel_to_NMC" id="Patient" value="Patient" autocomplete="off">
               <label class="btn btn-outline-primary" for="Patient">Patient</label> <br />
               <input type="radio" class="btn-check" name="org_rel_to_NMC" id="PublicOfficial" value="Public Official" autocomplete="off">
               <label class="btn btn-outline-primary" for="PublicOfficial">Public Official</label>  <br />
               <input type="radio" class="btn-check" name="org_rel_to_NMC" id="Other" value="Other" autocomplete="off">
               <label class="btn btn-outline-primary" for="Other">Other</label>
               <br />
               
              
               <strong>  17. Name of recipient(s)'s organisation"   <span style="color: red;">*</span> </strong>  <br />
               <input Id="recipientsorganisation" required style="width: 95%;" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">  </br>

               <strong>  18. Please provide a description of the gift or hospitality <span style="color: red;">*</span> </strong>  <br />
               <input Id="descofgiftorhospi" required style="width: 95%;" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">  </br>

              
               <strong>  19. Provide the value of the gift or hospitality in AED. If you don't know the value, please provide what the Fair Market Value would be as that term is defined in our Gifts, Hospitality, and Business Courtesies Policy.
               <span style="color: red;">*</span> </strong>  <br />
               &nbsp; &nbsp; &nbsp; &nbsp; Please enter the value numerically (eg. 100, 1000, 10000) <br />
               <input Id="giftorhospitalityinAED" required style="width: 95%;" type="number" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">  </br>

               <strong> 20. What is the business justification for the giving?<span style="color: red;">*</span> </strong>  <br />
               <textarea name="businessjustification" Id="businessjustification"  style="width: 95%;  height:50px;" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" ></textarea>
               <br />

               <strong>  21. Please provide any additional comments  </strong>  <br />
               <textarea name="additionalcomments" Id="additionalcomments"   style="width: 95%;  height:50px;" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" ></textarea>
 

               </br></br>            
              <a style="width: 100px;" id="DisclosureBack" class="btn btn-primary back">Back</a>
              <a style="width: 100px;" id="DisclosureNext" class="btn btn-primary continue">Next</a> 
              
              <div style="float: right; padding-right: 35px;">
              <span>Page 4 of 6</span>
            <div style="height: 7px; width:250px; border-radius: 0.125rem; background-color: #ccc; color: #fff;">
               <div style="height: 100%; border-radius: 0.125rem; background-color: #007bff; color: #fff; width: 60%;"></div>
            </div>
         </div>

          </br>  </br>
          <div  style="left: 0px; top: 10px; border: 0px;" class="-a-262">Never give out your password.<a class="css-264" tabindex="0" role="link">Report abuse</a></div>
           </br> </br> 

            </div>            
        </div>
       

<!--  Next Panel  -->




        <div role="tabpanel" class="tab-pane" id="ConflictsPanel">

               <div style="height: 150px; background-color:#2CAFE0; padding-left: 45px;padding-right: 35px;">
                 </br>
                    <h3  style="padding-top: -95px;"><strong>   <img role="img" aria-hidden="true" src="https://lists.office.com/Images/a641b6d7-15cd-4d00-84d1-f5c3903fc026/6621c261-8882-49f9-8fa8-2ebbc41cc5a2/TD3E3A68RPSKSHQG9G6ODMJRRD/840fd329-7823-4b98-accb-fe418f6d3e8f" height="50" width="117" style="left: 0px; top: 0px; border: 0px; vertical-align: middle; position: relative;">
                    Gifts, Hospitality, and Business Courtesies Declaration and Request for Approval Form </strong></h3>
                  </br>
               </div>

                <div style="background-color:powderblue; padding-left: 35px;">
                  &nbsp; &nbsp;   <h5><span style=" color: red;">*</span> Required</h5>

                  &nbsp; &nbsp; <h4 style="color: #2CAFE0;"><strong>Conflicts of Interest Assessment</strong></h4> </br>



                  <strong>  22. To the best of your knowledge, are you aware of any contract negotiations underway between NMC and the person or their organisation? <span style="color: red;">*</span></strong><br /> 
                  <input type="radio" class="btn-check" name="contrNegoUnderNMC" id="contrNegoUnderNMCYES" value="YES" autocomplete="off">
                  <label class="btn btn-outline-primary" for="contrNegoUnderNMCYES">YES</label><br />
                  <input type="radio" class="btn-check" name="contrNegoUnderNMC" id="contrNegoUnderNMCNO" value="NO" autocomplete="off">
                  <label class="btn btn-outline-primary" for="contrNegoUnderNMCNO">NO</label><br /> 


                  <span id="yesdetailsspan">
                  <strong> 23. If you answered yes to the last question, please provide details <span style="color: red;">*</span> </strong>  <br />
                  <input Id="yesdetails" required style="width: 95%;" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">  </br>
                  </span>

                  <strong> 24. This is not permitted under NMC's Gift, Hospitality, and Business Courtesies Policy. Is this a gift or hospitality?<span style="color: red;">*</span> </strong>  <br />
                  <input type="radio" class="btn-check" name="PermittedUnderNMCgiftHospi" id="PermittedUnderNMCgiftHospiGift" autocomplete="off" value="Gift">
                  <label class="btn btn-outline-primary" for="PermittedUnderNMCgiftHospiGift"> Gift</label></br>
                  <input type="radio" class="btn-check" name="PermittedUnderNMCgiftHospi" id="PermittedUnderNMCgiftHospiHospi" value="Hospitality" autocomplete="off">
                  <label class="btn btn-outline-primary" for="PermittedUnderNMCgiftHospiHospi">Hospitality</label>
                  
                  </br></br>            
                  <a style="width: 100px;" id="ConflictsBack" class="btn btn-primary back">Back</a>
                  <a style="width: 100px;" id="ConflictsNext" class="btn btn-primary back">Next</a> 
                  
                  <div style="float: right; padding-right: 35px;">
                  <span>Page 5 of 6</span>
                <div style="height: 7px; width:250px; border-radius: 0.125rem; background-color: #ccc; color: #fff;">
                   <div style="height: 100%; border-radius: 0.125rem; background-color: #007bff; color: #fff; width: 80%;"></div>
                </div>
               </div>
    
              </br>  </br>
              <div  style="left: 0px; top: 10px; border: 0px;" class="-a-262">Never give out your password.<a class="css-264" tabindex="0" role="link">Report abuse</a></div>
               </br> </br> 

                </div>            
        </div>


<!--  Next Panel  -->




        <div role="tabpanel" class="tab-pane" id="AttestationPanel">

           <div style="height: 150px; background-color:#2CAFE0; padding-left: 45px;padding-right: 35px;">
             </br>
                 <h3  style="padding-top: -95px;"><strong>   <img role="img" aria-hidden="true" src="https://lists.office.com/Images/a641b6d7-15cd-4d00-84d1-f5c3903fc026/6621c261-8882-49f9-8fa8-2ebbc41cc5a2/TD3E3A68RPSKSHQG9G6ODMJRRD/840fd329-7823-4b98-accb-fe418f6d3e8f" height="50" width="117" style="left: 0px; top: 0px; border: 0px; vertical-align: middle; position: relative;">
                 Gifts, Hospitality, and Business Courtesies Declaration and Request for Approval Form </strong></h3>
              </br>
           </div>

           <div style="background-color:powderblue; padding-left: 35px;">
            &nbsp; &nbsp;   <h5><span style="color: red;">*</span> Required</h5>

               &nbsp; &nbsp; <h4 style="color: #2CAFE0;"><strong>Attestation</strong></h4> </br>

              <strong>  25. I confirm that the information provided in this form is accurate and complete. I understand that it is a breach of NMC's Gifts, Hospitality, 
              and Business Courtersies Policy to proceed with giving or receiving a gift when prior approval is required and I have not been given said approval ? 
              <span style="color: red;">*</span></strong><br /></br>
              <input type="radio" class="btn-check" name="confirm" id="confirm" autocomplete="off" value="YES">
              <label class="btn btn-outline-primary" for="confirm"> YES</label></br>
              </br></br> 
              <a style="width: 100px;" id="AttestationBack" class="btn btn-primary back">Back</a>
              <a style="width: 100px;" id="Submit" class="btn btn-success continue">Submit</a> 
              
              <div style="float: right; padding-right: 35px;">
              <span>Page 6 of 6</span>
            <div style="height: 7px; width:250px; border-radius: 0.125rem; background-color: #ccc; color: #fff;">
               <div style="height: 100%; border-radius: 0.125rem; background-color: #007bff; color: #fff; width: 100%;"></div>
            </div>
          </div>

          </br>  </br>
          <div  style="left: 0px; top: 10px; border: 0px;" class="-a-262">Never give out your password.<a class="css-264" tabindex="0" role="link">Report abuse</a></div>
           </br> </br> 

           </div>            
        </div>

    </div>



<!--  Next Panel  -->


    <!--

      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active">
          <a href="#Instruction" aria-controls="Instruction" role="tab" data-toggle="tab" aria-expanded="true">1</a>
        </li>
        <li>
          <a href="#Nature" aria-controls="Nature" role="tab" data-toggle="tab" aria-expanded="false">2</a>
        </li>
        <li>
          <a href="#review" aria-controls="review" role="tab" data-toggle="tab" aria-expanded="false">3</a>
        </li>
      </ul>
      -->
            </br></br>    
  </div>

  <div id="push"></div>

 
           
      </div>
    </section>`;
   
    this._bindEvents();
    this.bindEventsVisible();
    //this.InstructionNext('GivingPanel');
    this.InstructionNext('InstructionPanel');

    



    var yesRadio = document.getElementById("contrNegoUnderNMCYES") as HTMLInputElement;
    var noRadio = document.getElementById("contrNegoUnderNMCNO") as HTMLInputElement;
    var detailsInput = document.getElementById("yesdetailsspan") as HTMLInputElement;
    detailsInput.style.display = yesRadio.checked ? "block" : "none";


    this.ValidationClearInstruction();  



    
    (document.getElementById("SpangiftExAED") as HTMLInputElement).style.display = "none";
    (document.getElementById("Spannoncash") as HTMLInputElement).style.display = "none";
    (document.getElementById("SpanNMCgiftHospitality") as HTMLInputElement).style.display = "none";
    (document.getElementById("Spangiftreceived") as HTMLInputElement).style.display = "none";
  }




  private ValidationClearInstruction(): void {
    (document.getElementById("NameValidation") as HTMLInputElement).style.display = "none";
    (document.getElementById("statenameValidation") as HTMLInputElement).style.display = "none";
    (document.getElementById("professionaldesignationValidation") as HTMLInputElement).style.display = "none";
    (document.getElementById("NMCemailIDValidation") as HTMLInputElement).style.display = "none"; 
    (document.getElementById("ERPNumberValidation") as HTMLInputElement).style.display = "none";
    (document.getElementById("manageremailIDValidation") as HTMLInputElement).style.display = "none";
  }

  private validateRequiredFieldsInstruction(): boolean {
    var Name = (document.getElementById("Name") as HTMLInputElement).value;
    var statename = (document.getElementById("statename") as HTMLInputElement).value;
    var professionaldesignation = (document.getElementById("professionaldesignation") as HTMLInputElement).value;
    var NMCemailID = (document.getElementById("NMCemailID") as HTMLInputElement).value;
    var ERPNumber = (document.getElementById("ERPNumber") as HTMLInputElement).value;
    var manageremailID = (document.getElementById("manageremailID") as HTMLInputElement).value;
    

    if (!Name || !statename || !professionaldesignation || !NMCemailID || !ERPNumber || !manageremailID) {

        if (!Name) { (document.getElementById("NameValidation") as HTMLInputElement).style.display = "block"; }
        else{(document.getElementById("NameValidation") as HTMLInputElement).style.display = "none";}

        if (!statename) {(document.getElementById("statenameValidation") as HTMLInputElement).style.display = "block";}
        else{(document.getElementById("statenameValidation") as HTMLInputElement).style.display = "none";}

        if (!professionaldesignation) { (document.getElementById("professionaldesignationValidation") as HTMLInputElement).style.display = "block"; }
        else{(document.getElementById("professionaldesignationValidation") as HTMLInputElement).style.display = "none";}

        if (!NMCemailID) { (document.getElementById("NMCemailIDValidation") as HTMLInputElement).style.display = "block";  }
        else{(document.getElementById("NMCemailIDValidation") as HTMLInputElement).style.display = "none";}

        if (!ERPNumber) { (document.getElementById("ERPNumberValidation") as HTMLInputElement).style.display = "block";}
        else{(document.getElementById("ERPNumberValidation") as HTMLInputElement).style.display = "none";}

        if (!manageremailID) { (document.getElementById("manageremailIDValidation") as HTMLInputElement).style.display = "block"; }
        else{(document.getElementById("manageremailIDValidation") as HTMLInputElement).style.display = "none";}

        return false;
    }
    this.ValidationClearInstruction();
    return true; 
  }

 private bindEventsVisible(): void {



  // 8 th qustion visible > 9
       const healthcarePYes = document.getElementById('healthcarePyes') as HTMLInputElement;
       const healthcarePNo = document.getElementById('healthcarePNo') as HTMLInputElement;
       const SpangiftHospitality = document.getElementById('SpangiftHospitality');
     
       const SpangifthospiPatient = document.getElementById('SpangifthospiPatient');



       const SpanPriorApprovISneed = document.getElementById('SpanPriorApprovISneed');
       const Spannoncash = document.getElementById('Spannoncash');

      
       const SpanNMCgiftHospitality = document.getElementById('SpanNMCgiftHospitality');

       const Spangiftreceived = document.getElementById('Spangiftreceived') as HTMLInputElement;





     
       const toggleSpangiftHospitality = () => {
       SpangiftHospitality.style.display = healthcarePYes.checked ? 'none' : 'block';
       SpangifthospiPatient.style.display = healthcarePNo.checked ? 'none' : 'block';


           if(healthcarePYes.checked) {  SpanPriorApprovISneed.style.display = 'none';} 
           if(healthcarePYes.checked) {  Spannoncash.style.display = 'none';} 
           if(healthcarePYes.checked) {  SpanNMCgiftHospitality.style.display = 'none';} 

           if(healthcarePYes.checked) {  Spangiftreceived.style.display = 'none';} 
       
       };
     
       healthcarePYes.addEventListener('change', toggleSpangiftHospitality);
       healthcarePNo.addEventListener('change', toggleSpangiftHospitality);
     
       // Trigger the change event initially to set the initial state
       toggleSpangiftHospitality();
       healthcarePYes.dispatchEvent(new Event('change'));
       SpangiftHospitality.style.display ='none' ;
       SpangifthospiPatient.style.display ='none' ;
       
     
     
  // GifgiftHospitality th qustion visible > 10
       const GifgiftHospitalitygift = document.getElementById('GifgiftHospitalitygift') as HTMLInputElement;
       const giftHospitalityHospitality = document.getElementById('giftHospitalityHospitality') as HTMLInputElement;
       const SpangiftExAED = document.getElementById('SpangiftExAED');
       const SpanhospitalityAED = document.getElementById('SpanhospitalityAED');
     
        



       
     
       const toggleSpangiftHospitalityAED = () => {
         SpangiftExAED.style.display = GifgiftHospitalitygift.checked ? 'block' : 'none';
         SpanhospitalityAED.style.display = giftHospitalityHospitality.checked ? 'block' : 'none';

           if(giftHospitalityHospitality.checked) {  SpanPriorApprovISneed.style.display = 'none';} 
           if(giftHospitalityHospitality.checked) {  Spannoncash.style.display = 'none';} 
        
           if(giftHospitalityHospitality.checked) {  SpanNMCgiftHospitality.style.display = 'none';} 

           if(giftHospitalityHospitality.checked) {  Spangiftreceived.style.display = 'none';} 
           

       };
     
       GifgiftHospitalitygift.addEventListener('change', toggleSpangiftHospitalityAED);
       giftHospitalityHospitality.addEventListener('change', toggleSpangiftHospitalityAED);
     
       // // Trigger the change event initially to set the initial state
       toggleSpangiftHospitalityAED();
       GifgiftHospitalitygift.dispatchEvent(new Event('change'));
       SpangiftExAED.style.display ='none' ;
       SpanhospitalityAED.style.display ='none' ;
    

    // giftExAEDyes
    //giftExAEDno
    // YEs : SpanPriorApprovISneed
    // NO   : Spannoncash
    // giftExAEDyes th qustion visible > 11

    const giftExAEDyes = document.getElementById('giftExAEDyes') as HTMLInputElement;
    const giftExAEDno = document.getElementById('giftExAEDno') as HTMLInputElement;
  



    const toggleSpangifthospiPatien = () => {
      SpanPriorApprovISneed.style.display = giftExAEDyes.checked ? 'block' : 'none';
      Spannoncash.style.display = giftExAEDno.checked ? 'block' : 'none';

      if(giftExAEDyes.checked) {  SpanNMCgiftHospitality.style.display = 'none';} 
      if(giftExAEDyes.checked) {  Spangiftreceived.style.display = 'none';} 
      
      

    };
  
    giftExAEDyes.addEventListener('change', toggleSpangifthospiPatien);
    giftExAEDno.addEventListener('change', toggleSpangifthospiPatien);
  
    // // Trigger the change event initially to set the initial state
    toggleSpangifthospiPatien();
    giftExAEDyes.dispatchEvent(new Event('change'));
    SpanPriorApprovISneed.style.display ='none' ;
    Spannoncash.style.display ='none' ;






    // noncashyes
    // noncashno
    
    // NO SpanNMCgiftHospitality

    const noncashyes = document.getElementById('noncashyes') as HTMLInputElement;
     const noncashno = document.getElementById('noncashno') as HTMLInputElement;
  


    
    const toggleSpanNMCgiftHospitality = () => {
      SpanNMCgiftHospitality.style.display = noncashno.checked ? 'block' : 'none';
      
      if(noncashyes.checked) {  Spangiftreceived.style.display = 'none';} 
    };

    noncashyes.addEventListener('change', toggleSpanNMCgiftHospitality);
    noncashno.addEventListener('change', toggleSpanNMCgiftHospitality);
  
    // // Trigger the change event initially to set the initial state
    toggleSpanNMCgiftHospitality();
    noncashno.dispatchEvent(new Event('change'));
    SpanNMCgiftHospitality.style.display ='none' ;


     
    
    // NMCgiftHospitalityGift
    // NMCgiftHospitalityHospitality

    // gift : Spangiftreceived

    const NMCgiftHospitalityGift = document.getElementById('NMCgiftHospitalityGift') as HTMLInputElement;
    const NMCgiftHospitalityHospitality = document.getElementById('NMCgiftHospitalityHospitality') as HTMLInputElement;
    

    const toggleSpanSpangiftreceived = () => {
      Spangiftreceived.style.display = NMCgiftHospitalityGift.checked ? 'none' : 'block';
      Spangiftreceived.style.display = NMCgiftHospitalityHospitality.checked ?  'none' : 'block';
    };
  
    NMCgiftHospitalityGift.addEventListener('change', toggleSpanSpangiftreceived);
    NMCgiftHospitalityHospitality.addEventListener('change', toggleSpanSpangiftreceived);
   
    // // Trigger the change event initially to set the initial state
    toggleSpanSpangiftreceived();
    NMCgiftHospitalityGift.dispatchEvent(new Event('change'));
    Spangiftreceived.style.display ='none' ;


    
  }

  private _bindEvents(): void {

   this.domElement.querySelector('#InstructionNext').addEventListener('click', () => { 
      if (this.validateRequiredFieldsInstruction()) {this.InstructionNext('NaturePanel'); } 
   });


    this.domElement.querySelector('#NatureBack').addEventListener('click', () => { this.InstructionNext('InstructionPanel'); });
    this.domElement.querySelector('#NatureNext').addEventListener('click', () => { this.InstructionNext("ReceivinggivingPanel"); });

    this.domElement.querySelector('#GivingBack').addEventListener('click', () => { this.InstructionNext('NaturePanel'); });
    this.domElement.querySelector('#GivingNext').addEventListener('click', () => { this.InstructionNext("DisclosurePanel"); });

    this.domElement.querySelector('#ReceivingBack').addEventListener('click', () => { this.InstructionNext('NaturePanel'); });
    this.domElement.querySelector('#ReceivingNext').addEventListener('click', () => { this.InstructionNext('DisclosurePanel'); });

    this.domElement.querySelector('#DisclosureBack').addEventListener('click', () => { this.InstructionNext('ReceivinggivingPanel'); });
    this.domElement.querySelector('#DisclosureNext').addEventListener('click', () => { this.InstructionNext('ConflictsPanel'); });


    this.domElement.querySelector('#ConflictsBack').addEventListener('click', () => { this.InstructionNext('DisclosurePanel'); });
    this.domElement.querySelector('#ConflictsNext').addEventListener('click', () => { this.InstructionNext('AttestationPanel'); });


    this.domElement.querySelector('#AttestationBack').addEventListener('click', () => { this.InstructionNext('ConflictsPanel'); });
    this.domElement.querySelector('#Submit').addEventListener('click', () => { this.addListItem(); });




  }

  private InstructionNext(DisplayStyle: string): void {
    var Instruction = 'none';
    var Nature = 'none';
    var Giving = 'none';
    var Receiving = 'none';
    var Disclosure = 'none';
    var Conflicts = 'none';
    var Attestation = 'none';



    if (DisplayStyle == 'ReceivinggivingPanel')
      {
         var givingReceivingValue = ((document.querySelector('input[name="givingreceiving"]:checked') as HTMLInputElement)?.value) || "";
         var panelnav ;
                if (givingReceivingValue =="receiving"){
                  panelnav = "ReceivingPanel";
              //   alert(panelnav);
                }
                else if(givingReceivingValue = "giving"){
            panelnav = "GivingPanel";
      } 
      //alert(panelnav);
      DisplayStyle =panelnav;
    }

    
    if (DisplayStyle == 'InstructionPanel') {
        Instruction = "block";
    } else if (DisplayStyle == 'NaturePanel') {
        Nature = "block";
    } else if (DisplayStyle == 'GivingPanel') {
      Giving = "block";
    }else if (DisplayStyle == 'ReceivingPanel') {
      Receiving = "block";
    } else if (DisplayStyle == 'DisclosurePanel') {
        Disclosure = 'block';
    } else if (DisplayStyle == 'ConflictsPanel') {
      Conflicts = 'block'; 
    } else if (DisplayStyle == 'AttestationPanel') {
      Attestation = 'block';
    } else if (DisplayStyle == 'Submit') {
      Attestation = "block";
    }

    var element = document.getElementById("InstructionPanel");
    element.style.display = Instruction;

    element = document.getElementById("NaturePanel");
    element.style.display = Nature;

    element = document.getElementById("GivingPanel");
    element.style.display = Giving;
    

    element = document.getElementById("ReceivingPanel");
    element.style.display = Receiving;

    element = document.getElementById("DisclosurePanel");
    element.style.display = Disclosure;

    element = document.getElementById("ConflictsPanel");
    element.style.display = Conflicts;

    element = document.getElementById("AttestationPanel");
    element.style.display = Attestation;
    
}

private addListItem(): void {
           let web = new Web("https://infopiesolution.sharepoint.com/sites/Training");
           
           const list = web.lists.getByTitle("Gifts_Hospitality_and_Business").items.getAll();
           
           var Name = (document.getElementById("Name") as HTMLInputElement).value;
           var statename = (document.getElementById("statename") as HTMLInputElement).value;
           var professionaldesignation = (document.getElementById("professionaldesignation") as HTMLInputElement).value;
           var NMCemailID = (document.getElementById("NMCemailID") as HTMLInputElement).value;
           var ERPNumber = (document.getElementById("ERPNumber") as HTMLInputElement).value;
           var manageremailID = (document.getElementById("manageremailID") as HTMLInputElement).value;


           var givingReceivingValue = ((document.querySelector('input[name="givingreceiving"]:checked') as HTMLInputElement)?.value) || "";
           


           var giveDate = null;
           var giveDateValue = (document.getElementById("giveDate") as HTMLInputElement).value;
           var giveValueDate = Date.parse(giveDateValue);
           if (!isNaN(giveValueDate)) {
            giveDate = new Date(giveValueDate).toISOString();
           }

           var ReciPubcOffi = ((document.querySelector('input[name="ReciPubcOffi"]:checked') as HTMLInputElement)?.value) || "";
           


           var receivedDate = null;
           var receivedDateValue = (document.getElementById("receivedDate") as HTMLInputElement).value;
           var receivedValueDate = Date.parse(receivedDateValue);
           if (!isNaN(receivedValueDate)) {
               receivedDate = new Date(receivedValueDate).toISOString();
           }
           
           var isHealthcareProfessional = ((document.querySelector('input[name="healthcareP"]:checked') as HTMLInputElement)?.value) || "";
           var giftHospitalityValue = ((document.querySelector('input[name="giftHospitality"]:checked') as HTMLInputElement)?.value) || "";
           var gifthospiPatient = ((document.querySelector('input[name="gifthospiPatient"]:checked') as HTMLInputElement)?.value) || "";
           var giftValueExceeds100 = ((document.querySelector('input[name="giftExAED"]:checked') as HTMLInputElement)?.value) || "";
           var hospitalityAED = ((document.querySelector('input[name="hospitalityAED"]:checked') as HTMLInputElement)?.value) || "";

          var  PriorApprovISneed = ((document.querySelector('input[name="PriorApprovISneed"]:checked') as HTMLInputElement)?.value) || "";
           var isNonCashGift = ((document.querySelector('input[name="noncash"]:checked') as HTMLInputElement)?.value) || "";
           var notPermittedValue = ((document.querySelector('input[name="NMCgiftHospitality"]:checked') as HTMLInputElement)?.value) || "";
           var giftSubmittedToMarketing = ((document.querySelector('input[name="giftreceived"]:checked') as HTMLInputElement)?.value) || "";
           
           var FirstAndLastNameRecipient = (document.getElementById("FirstAndLastNameRecipient") as HTMLInputElement).value;
           var RecipientProfessionalTitle = (document.getElementById("RecipientProfessionalTitle") as HTMLInputElement).value;
           var org_rel_to_NMC = ((document.querySelector('input[name="org_rel_to_NMC"]:checked') as HTMLInputElement)?.value) || "";
           var recipientsorganisation = (document.getElementById("recipientsorganisation") as HTMLInputElement).value;
           var descofgiftorhospi = (document.getElementById("descofgiftorhospi") as HTMLInputElement).value;
           
           var inputValue = (document.getElementById("giftorhospitalityinAED") as HTMLInputElement).value;

           var giftorhospitalityinAED = 0;

            if (inputValue === "") { giftorhospitalityinAED = null;} 
            else { giftorhospitalityinAED = parseInt(inputValue);}
           
           var businessjustification = (document.getElementById("businessjustification") as HTMLInputElement).value;
           var additionalcomments = (document.getElementById("additionalcomments") as HTMLInputElement).value;


           var  contrNegoUnderNMC = ((document.querySelector('input[name="contrNegoUnderNMC"]:checked') as HTMLInputElement)?.value) || "";
           var yesdetails = (document.getElementById("yesdetails") as HTMLInputElement).value;
           var  PermittedUnderNMCgiftHospi = ((document.querySelector('input[name="PermittedUnderNMCgiftHospi"]:checked') as HTMLInputElement)?.value) || "";


            var  confirm = ((document.querySelector('input[name="confirm"]:checked') as HTMLInputElement)?.value) || "";
            if(confirm === 'YES'){}
            else{
              alert(" Conform Your Details !");
              return;
          }


           var msg = statename + " , " + professionaldesignation + " , " + NMCemailID + " , " + ERPNumber + " , " + manageremailID + " , " + givingReceivingValue + " , " + receivedDate + " , " + isHealthcareProfessional + " , " + giftHospitalityValue + " , " + giftValueExceeds100 + " , " + isNonCashGift + " , " + notPermittedValue + " , " + giftSubmittedToMarketing + " , " + FirstAndLastNameRecipient + " , " + RecipientProfessionalTitle + " , " + org_rel_to_NMC + " , " + recipientsorganisation + " , " + descofgiftorhospi + " , " + businessjustification + " , " + additionalcomments;
           console.log(msg);
           
      web.lists.getByTitle('Gifts_Hospitality_and_Business').items.add({
               Name: Name,
               state: statename,
               professionaldesignation_x002f_ti: professionaldesignation,
               NMCemail: NMCemailID,
               ERPNumber: ERPNumber,
               managersemail: manageremailID,
               givingorreceiving: givingReceivingValue,
               giveDate :giveDate,
               ReciPubcOffiyes : ReciPubcOffi,
               dateyoureceivedorwillreceivetheg: receivedDate,
               healthcareprofessional: isHealthcareProfessional,
               giftorhospitality: giftHospitalityValue,
               gifthospiPatient : gifthospiPatient,
               giftexceedAED100: giftValueExceeds100,
               hospitalityAED : hospitalityAED,
               SpanPriorApprovISneed : PriorApprovISneed,
               giftnon_x002d_cashornon_x002d_ca: isNonCashGift,
               notpermittedunderNMCsGift_x002c_: notPermittedValue,
               giftandyouhavealreadyreceiveditb: giftSubmittedToMarketing,
               FirstAndLastNameRecipient: FirstAndLastNameRecipient,
               RecipientProfessionalTitle: RecipientProfessionalTitle,
               org_rel_to_NMC: org_rel_to_NMC,
               recipientsorganisation: recipientsorganisation,
               descofgiftorhospi: descofgiftorhospi,
               giftorhospitalityinAED: giftorhospitalityinAED,
               businessjustification: businessjustification,
               additionalcomments: additionalcomments,
               contrNegoUnderNMC : contrNegoUnderNMC,
               yesdetails : yesdetails,
               PermittedUnderNMCgiftHospi :PermittedUnderNMCgiftHospi,
               confirm : confirm
        }).then(r => {
                   // const itemId = r.data.Id;
                   // const fileInput = document.getElementById('fileAttachments') as HTMLInputElement;
                   // if (fileInput && fileInput.files && fileInput.files.length > 0) {
          //   this.uploadAttachment(itemId, fileInput);
          // }
    
          alert("Form Submited Succesfully !");
    });
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
