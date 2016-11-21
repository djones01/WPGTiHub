import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Target, TargetField } from "./target";
import { DataService } from "../../services/data.service";
import { TargetService } from "../../services/target.service";
import { TFieldSelectService } from "../../services/target-select.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FileUploader, FileSelectDirective } from "ng2-file-upload";
import { Response, Headers } from "@angular/http";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "target-addedit",
    template: require("./tgt.component.html"),
    providers: [DataService, TargetService, TFieldSelectService],
})
export class TgtComponent implements OnInit, OnDestroy {
    //Control the template / manual header boxes
    sopt = true;
    //Reset the form
    active = true;
    //Used for editing target
    editing = false;
    editId = -1;
    //Target which is being worked on
    target: Target;
    uploader: FileUploader;
    tfieldCount = 0;
    hasTargetFields = false;
    hasSelectedTarget = true;
    delimiter: string;

    //Subscriptions for target adding / editing service
    targetSubscription: Subscription;
    hasTargetFieldsSubscription: Subscription;
    hasSelectedTargetSubscription: Subscription;

    onFieldCountChange() {
        this.targetService.modifyTFields(this.tfieldCount);
    }

    onSubmit() {
        this.targetService.createOrUpdateTarget();
        //Refresh targets in modal
        this.selectService.initTargets();
        this.newTarget();
    }

    extractFile() {
        this.uploader.onBuildItemForm = (item, form) => {
            form.append("delimiter", this.delimiter);
        };
        this.uploader.uploadAll();
        this.delimiter = "";
    }

    newTarget() {
        this.targetService.clear();
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    //Modal Functions
    openTargetSelect(content) {
        this.modalService.open(content, { size: "lg" })
            .result.then((result) => {
                    //User selected target field in modal
                    if (result == "Select Target") {
                        this.selectService.getSelectedTarget().subscribe(target => this.target = target);
                        this._dataService.GetAllWithId("Targets/GetTargetFieldsByTarget", this.target["targetId"])
                            .subscribe(targetFields => {
                                this.targetService.setTargetFields(targetFields);
                            });
                    }
                },
                (reason) => {});
    }

    constructor(private _dataService: DataService,
        private modalService: NgbModal,
        private targetService: TargetService,
        private selectService: TFieldSelectService) {
        this.uploader = new FileUploader({ url: "api/File/ExtractHeaders" });
        this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: any) => {
            var res = JSON.parse(response);
            this.targetService.setTargetFields(res);
        };
    }

    ngOnInit(): void {
        this.targetSubscription = this.targetService.getTarget().subscribe(target => this.target = target);
        this.hasTargetFieldsSubscription = this.targetService.hasTargetFields()
            .subscribe(hasTargetFields => this.hasTargetFields = hasTargetFields);
        this.hasSelectedTargetSubscription = this.selectService.hasSelectedTarget()
            .subscribe(hasSelectedTarget => this.hasSelectedTarget = hasSelectedTarget);
    }

    ngOnDestroy(): void {
        this.targetSubscription.unsubscribe();
        this.hasTargetFieldsSubscription.unsubscribe();
        this.hasSelectedTargetSubscription.unsubscribe();
    }

}