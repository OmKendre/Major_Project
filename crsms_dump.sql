--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-08-07 21:48:05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16402)
-- Name: electric_permit; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA electric_permit;


ALTER SCHEMA electric_permit OWNER TO postgres;

--
-- TOC entry 5 (class 2615 OID 16401)
-- Name: height_permit; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA height_permit;


ALTER SCHEMA height_permit OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16416)
-- Name: permit; Type: TABLE; Schema: electric_permit; Owner: postgres
--

CREATE TABLE electric_permit.permit (
    permit_id integer NOT NULL,
    unit_name text NOT NULL,
    equipment_tag_no text NOT NULL,
    operation_in_charge_name text NOT NULL,
    operation_in_charge_date date,
    requirement_emergency boolean NOT NULL,
    "equipment_not_in_operation	" boolean,
    "ordinary_permit	" boolean,
    locks_tags_removed boolean,
    equipment_earthing_intact boolean,
    loto_operation_local_switch boolean,
    clearance_certificate_returned boolean,
    job_completion_certificate_returned boolean,
    energise_requested_by_name text,
    energise_requested_by_date date,
    de_energized_on date,
    power_fuse_status text,
    "breaker_control_plug_status	" text,
    breaker_test_ok boolean,
    trip_circuit_healthy boolean,
    "breaker_racked_in_service_position	" boolean,
    control_supply_switched_on boolean,
    space_heater_switched_on boolean,
    breaker_mcc_front_closed boolean,
    mcc_module_switched_on boolean,
    lid_panel_opened boolean,
    line_discharged_test_done boolean,
    temporary_safety_ground boolean,
    breaker_mcc_checked boolean,
    loto_performed_breaker_mcc boolean,
    final_signed_by text,
    final_signed_date date,
    "final_signed_time	" time without time zone,
    final_signed_designation text,
    final_signature_image bytea
);


ALTER TABLE electric_permit.permit OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16415)
-- Name: permit_permit_id_seq; Type: SEQUENCE; Schema: electric_permit; Owner: postgres
--

CREATE SEQUENCE electric_permit.permit_permit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE electric_permit.permit_permit_id_seq OWNER TO postgres;

--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 220
-- Name: permit_permit_id_seq; Type: SEQUENCE OWNED BY; Schema: electric_permit; Owner: postgres
--

ALTER SEQUENCE electric_permit.permit_permit_id_seq OWNED BY electric_permit.permit.permit_id;


--
-- TOC entry 219 (class 1259 OID 16404)
-- Name: permit; Type: TABLE; Schema: height_permit; Owner: postgres
--

CREATE TABLE height_permit.permit (
    permit_id integer NOT NULL,
    date date NOT NULL,
    person_responsible text NOT NULL,
    work_location text NOT NULL,
    work_description text NOT NULL,
    schedule_start timestamp without time zone NOT NULL,
    schedule_end timestamp without time zone NOT NULL,
    fall_type text NOT NULL,
    fall_description text,
    fall_tested text,
    hazard_environment text NOT NULL,
    hazard_assessed boolean NOT NULL,
    work_can_proceed boolean NOT NULL,
    on_crane boolean,
    crane_description text,
    ppe_full_harness_checked boolean NOT NULL,
    ppe_shoes_provided boolean NOT NULL,
    ppe_helmet_provided boolean NOT NULL,
    access_fixed_ladder boolean,
    access_elevated_platform boolean,
    access_scissor_lift boolean,
    access_boom_lift boolean,
    access_catwalk boolean,
    access_key_control text,
    electrical_isolation_obtained boolean NOT NULL,
    isolation_time_from time without time zone,
    isolation_time_to time without time zone,
    other_isolation_required boolean,
    other_isolation_description text,
    staff_1_name text NOT NULL,
    staff_1_tno text NOT NULL,
    staff_1_signature text NOT NULL,
    staff_1_work text NOT NULL,
    responsible_person_name text NOT NULL,
    responsible_signature text NOT NULL,
    authorizing_name text NOT NULL,
    authorizing_signature text NOT NULL,
    safety_officer_name text NOT NULL,
    safety_signature text NOT NULL,
    safety_date date NOT NULL,
    responsible_date date NOT NULL,
    authorizing_date date NOT NULL,
    job_completion_date date NOT NULL,
    job_completion_time time without time zone NOT NULL,
    completion_signature text NOT NULL,
    completion_signed_by text NOT NULL,
    completion_signed_date date NOT NULL
);


ALTER TABLE height_permit.permit OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16403)
-- Name: permit_permit_id_seq; Type: SEQUENCE; Schema: height_permit; Owner: postgres
--

CREATE SEQUENCE height_permit.permit_permit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE height_permit.permit_permit_id_seq OWNER TO postgres;

--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 218
-- Name: permit_permit_id_seq; Type: SEQUENCE OWNED BY; Schema: height_permit; Owner: postgres
--

ALTER SEQUENCE height_permit.permit_permit_id_seq OWNED BY height_permit.permit.permit_id;


--
-- TOC entry 4749 (class 2604 OID 16419)
-- Name: permit permit_id; Type: DEFAULT; Schema: electric_permit; Owner: postgres
--

ALTER TABLE ONLY electric_permit.permit ALTER COLUMN permit_id SET DEFAULT nextval('electric_permit.permit_permit_id_seq'::regclass);


--
-- TOC entry 4748 (class 2604 OID 16407)
-- Name: permit permit_id; Type: DEFAULT; Schema: height_permit; Owner: postgres
--

ALTER TABLE ONLY height_permit.permit ALTER COLUMN permit_id SET DEFAULT nextval('height_permit.permit_permit_id_seq'::regclass);


--
-- TOC entry 4902 (class 0 OID 16416)
-- Dependencies: 221
-- Data for Name: permit; Type: TABLE DATA; Schema: electric_permit; Owner: postgres
--

COPY electric_permit.permit (permit_id, unit_name, equipment_tag_no, operation_in_charge_name, operation_in_charge_date, requirement_emergency, "equipment_not_in_operation	", "ordinary_permit	", locks_tags_removed, equipment_earthing_intact, loto_operation_local_switch, clearance_certificate_returned, job_completion_certificate_returned, energise_requested_by_name, energise_requested_by_date, de_energized_on, power_fuse_status, "breaker_control_plug_status	", breaker_test_ok, trip_circuit_healthy, "breaker_racked_in_service_position	", control_supply_switched_on, space_heater_switched_on, breaker_mcc_front_closed, mcc_module_switched_on, lid_panel_opened, line_discharged_test_done, temporary_safety_ground, breaker_mcc_checked, loto_performed_breaker_mcc, final_signed_by, final_signed_date, "final_signed_time	", final_signed_designation, final_signature_image) FROM stdin;
\.


--
-- TOC entry 4900 (class 0 OID 16404)
-- Dependencies: 219
-- Data for Name: permit; Type: TABLE DATA; Schema: height_permit; Owner: postgres
--

COPY height_permit.permit (permit_id, date, person_responsible, work_location, work_description, schedule_start, schedule_end, fall_type, fall_description, fall_tested, hazard_environment, hazard_assessed, work_can_proceed, on_crane, crane_description, ppe_full_harness_checked, ppe_shoes_provided, ppe_helmet_provided, access_fixed_ladder, access_elevated_platform, access_scissor_lift, access_boom_lift, access_catwalk, access_key_control, electrical_isolation_obtained, isolation_time_from, isolation_time_to, other_isolation_required, other_isolation_description, staff_1_name, staff_1_tno, staff_1_signature, staff_1_work, responsible_person_name, responsible_signature, authorizing_name, authorizing_signature, safety_officer_name, safety_signature, safety_date, responsible_date, authorizing_date, job_completion_date, job_completion_time, completion_signature, completion_signed_by, completion_signed_date) FROM stdin;
\.


--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 220
-- Name: permit_permit_id_seq; Type: SEQUENCE SET; Schema: electric_permit; Owner: postgres
--

SELECT pg_catalog.setval('electric_permit.permit_permit_id_seq', 1, false);


--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 218
-- Name: permit_permit_id_seq; Type: SEQUENCE SET; Schema: height_permit; Owner: postgres
--

SELECT pg_catalog.setval('height_permit.permit_permit_id_seq', 1, false);


--
-- TOC entry 4753 (class 2606 OID 16423)
-- Name: permit permit_pkey; Type: CONSTRAINT; Schema: electric_permit; Owner: postgres
--

ALTER TABLE ONLY electric_permit.permit
    ADD CONSTRAINT permit_pkey PRIMARY KEY (permit_id);


--
-- TOC entry 4751 (class 2606 OID 16411)
-- Name: permit permit_pkey; Type: CONSTRAINT; Schema: height_permit; Owner: postgres
--

ALTER TABLE ONLY height_permit.permit
    ADD CONSTRAINT permit_pkey PRIMARY KEY (permit_id);


-- Completed on 2025-08-07 21:48:05

--
-- PostgreSQL database dump complete
--

