import { Component, Input, OnInit, AfterViewInit, AfterViewChecked, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastController, IonInput, IonButton, AlertController } from '@ionic/angular';
import { ImageService } from '../services/image.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, first } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';

const { Device, Geolocation } = Plugins;

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

    email: string;
    password: string;

    validEmail: boolean;
    validPassword: boolean;
    @ViewChildren(IonInput) inputs: any;
    @ViewChild(IonButton, { static: false }) loginButton: IonButton;

    constructor(
        private authService: AuthService,
        private toastController: ToastController,
        private router: Router,
        private storage: Storage,
        private tokenHelper: JwtHelperService,
        private route: ActivatedRoute,
        private imageService: ImageService,
        private firestoreService: AngularFirestore,
        private customAlert: AlertController
    ) { }

    async ngOnInit() {

        // IF THERES STILL A SESSION, SEND USER TO HOME
        if (await this.storage.get("access_token") != "") {
            this.router.navigateByUrl('/home');
        }

        // TOAST IF LOGOUT
        this.route.queryParams.subscribe(async (data) => {
            try {
                if (this.router.getCurrentNavigation().extras.state.code == 1432) {
                    let toast = await this.toastController.create({
                        message: this.router.getCurrentNavigation().extras.state.msg,
                        duration: 2000
                    });
                    await toast.present();
                }
            } catch (e) { }
        });

    }

    async login() {

        const deviceInfo = await Device.getInfo();

        // REQUEST JWT, THEN STORE IT INSIDE IONIC STORAGE
        let data = await this.authService.getAccess(this.email, this.password);

        /* 
            TODO: TENGO QUE METERLO EN UNA PROMESA, Y EN FUNCION DEL RESULTADO HACER LO QUE SEA
        */

        await this.storage.set("access_token", data.access_token);
            
        try {
            await Geolocation.requestPermissions();
            const pos = await Geolocation.getCurrentPosition();
    
            await this.firestoreService.collection('logs').add(
                {
                    deviceInfo: deviceInfo,
                    email: this.email,
                    location: pos.coords,
                    timestamp: pos.timestamp
                }
            );
        } catch(e) {
            console.log(e);
            
        }
        

        await this.performLogin(data);
    }

    async tokenGetter() {
        if (this.storage.get("access_token") != undefined) {
            return await this.storage.get("access_token");
        }
    }

    async performLogin(data) {
        if (await this.tokenGetter() != undefined &&
            !this.tokenHelper.isTokenExpired(await this.tokenGetter())
        ) {
            await this.router.navigateByUrl('/home');

            //PRE POBLAMOS JUSTO DESPUÉS DE CONFIRMAR EL INICIO DE SESIÓN
            await this.imageService.init(
                await this.tokenGetter()
            );

        } else {
            if (data.status == 401) {
                let toast = await this.toastController.create({
                    message: "Error: Invalid credentials",
                    duration: 2000
                });
                toast.present();
            }
        }
    }

    checkRegex(value: string, pattern: string) {
        let matching = "" + value.match(pattern);

        if (matching != "null") {
            return true;
        }
    }

    checkAllRegex() {

        // EMAIL REGEX
        if (this.checkRegex(this.inputs._results[0].value, "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]{1,}")) {
            this.validEmail = true;
        } else {
            this.validEmail = false;
        }

        if (this.checkRegex(this.inputs._results[1].value, "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")) {
            this.validPassword = true;
        } else {
            this.validPassword = false;
        }

        if (this.validEmail && this.validPassword) {
            this.loginButton.disabled = false;
        }
    }
}

