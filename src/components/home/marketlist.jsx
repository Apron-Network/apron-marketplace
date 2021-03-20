import React, {useState} from 'react';
import {Modal,Button,InputGroup,FormControl,Form} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import Accounts from "../../api/Account";
import apiInterface from "../../api";
import {useSubstrate} from "../../api/contracts";
import Loading from "../loading/Loading";

export default function Marketlist(props) {

    const {state,dispatch} = useSubstrate();
    const {maincontract} = state;

    const [loading, setLoading] = useState(false);

    const handleToservice=(id)=>{
        props.history.push(`/service/${id}`)
    }
    const [show, setShow] = useState(false);
    const [form,setForm] = useState(['','','','','',"httpbin/","http"]);
    const [tokenlist, settokenlist] = useState([ {
        name: '',
        description: '',
        type: '',
        price: '',
    }]);

    const handleClose = () => setShow(false);
    const handleSave = async () => {


        const AccountId = await Accounts.accountAddress();
        const accountName = await Accounts.accountName();

        let obj = {
            uuid:uuidv4(),
            name:form[0],
            description:form[1],
            logo:form[2],
            providerName:accountName,
            providerOwner:AccountId,
            usage:form[3],
            declaimer:form[4],
            base_url:form[5],
            schema:form[6],
            pricePlan:JSON.stringify(tokenlist),
            createTime:Date.parse(new Date())
        };
        setShow(false);
        setLoading(true);

        // await apiInterface.main.setAddService(maincontract, obj, (data) => {
        //     if(data){
        //
        //         window.location.reload();
        //
        //     }
        // });

        await apiInterface.main.addService(obj).then( (data) => {
            if(data){
                window.location.reload();
            }
        });

    }
    const handleShow = () => setShow(true);

    const setAddress = (e, index) => {
        const {name,value} = e.target;
        let arr = tokenlist;
        arr[index][name] = value;

        settokenlist([...arr]);
    }

    const handleSelect = (e,index) => {
        const { value} = e.target;
        let arr = tokenlist;
        arr[index].type = value;
        settokenlist([...arr]);
    }
    const setFormvalue = (e, index) => {
        const { value} = e.target;
        let arr = form;
        arr[index] = value;

        setForm([...arr]);
    }
    const removeToken = (selectItem, index)=> {
        let arr = tokenlist;
        arr.splice(index, 1);
        settokenlist([...arr])
    }

    const addtoken = () => {
        let newArray = [...tokenlist];
        newArray.push({
            name: '',
            description: '',
            type: '',
            price: '',

        });
        settokenlist([...newArray])
    }

    const { list } = props;
    return(
        <div className="rain">
            <Loading showLoading={loading} tips='Create new service'/>
            <div className="contentbg list">
                <div className='row titleBg'>
                    <div className="col-6"><h4>SERVICE MARKET</h4></div>
                    <div className="col-6 rht addnew"><span onClick={handleShow}><i className='fa fa-plus' /> ADD NEW</span></div>
                    <Modal show={show} onHide={handleClose}
                           aria-labelledby="contained-modal-title-vcenter"
                           centered>
                        <Modal.Header closeButton>
                            <Modal.Title>ADD SERVICE</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="name"
                                    value={form[0]}
                                    name='name'
                                    autoComplete="off"
                                    onChange={(event) => setFormvalue(event,0)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="description"
                                    value={form[1]}
                                    name='desc'
                                    autoComplete="off"
                                    onChange={(event) => setFormvalue(event,1)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="logo"
                                    value={form[2]}
                                    name='logo'
                                    autoComplete="off"
                                    onChange={(event) => setFormvalue(event,2)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="usage"
                                    value={form[3]}
                                    name='usage'
                                    autoComplete="off"
                                    onChange={(event) => setFormvalue(event,3)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="declaimer"
                                    value={form[4]}
                                    name='declaimer'
                                    autoComplete="off"
                                    onChange={(event) => setFormvalue(event,4)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="base_url"
                                    value={form[5]}
                                    name='base_url'
                                    autoComplete="off"
                                    onChange={(event) => setFormvalue(event,5)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="schema"
                                    value={form[6]}
                                    name='schema'
                                    autoComplete="off"
                                    onChange={(event) => setFormvalue(event,6)}
                                />
                            </InputGroup>
                            {tokenlist.map((i, index) => (

                                <div key={index} className="pricePlan">
                                    <div className="row">
                                        <div className="col-6">
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder="name"
                                                    value={i.name}
                                                    name='name'
                                                    autoComplete="off"
                                                    onChange={(event) => setAddress(event, index)}
                                                />
                                            </InputGroup>
                                        </div>
                                        <div className="col-6">
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder="description"
                                                    value={i.description}
                                                    name='description'
                                                    autoComplete="off"
                                                    onChange={(event) => setAddress(event, index)}
                                                />
                                            </InputGroup>



                                        </div>
                                        <div className="col-6">
                                            <InputGroup className="mb-3">

                                                <Form.Control as="select" onChange={(event)=>handleSelect(event,index)} value={i.type}>
                                                    <option>select option</option>
                                                    <option  value='post-paid'>post-paid</option>
                                                    <option  value='prepay'>prepay</option>
                                                </Form.Control>
                                            </InputGroup>
                                        </div>
                                        <div className="col-6">
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder="price"
                                                    value={i.price}
                                                    name='price'
                                                    autoComplete="off"
                                                    onChange={(event) => setAddress(event, index)}
                                                />
                                            </InputGroup>
                                        </div>
                                            {
                                                !!index &&
                                                <i className="fa fa-close remove" onClick={()=> removeToken( i, index)} />
                                            }


                                    </div>
                                </div>
                            ))
                            }
                            <div>
                                <button variant="light" onClick={addtoken} className='addnewBtn'><i className="fa fa-plus"/> Add PricePlan</button>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSave}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <ul>
                    {
                        list && list.map(item=>(<li onClick={()=>handleToservice(item.uuid)} key={item.uuid}>
                            <div className="row">
                                <div className="col-1">
                                    <img
                                        src={item.logo}
                                        alt={item.name} />
                                </div>
                                <div className="col-11">
                                    <div className="title">{item.name}</div>
                                    <div className="rhtcontent">{item.desc}</div>
                                </div>
                            </div>
                        </li>))
                    }
                </ul>
            </div>
        </div>
    )
}
